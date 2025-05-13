provider "aws" {
  region = var.aws_region
}


resource "aws_ecs_cluster" "main" {
  name = "tearoom-cluster"
}


resource "aws_ecs_task_definition" "backend" {
  family                   = "tearoom-backend-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"


  container_definitions = jsonencode([
    {
      name      = "tearoom-backend"
      image     = "boralexdev/tearoom-backend:latest"
      essential = true
      portMappings = [
        {
          containerPort = 3000
          protocol      = "tcp"
        }
      ]
    }
  ])
}



resource "aws_subnet" "tearoom_public_subnet_2" {
  vpc_id                  = "vpc-04859a84539547d8e"
  cidr_block              = "172.31.1.0/24"
  availability_zone       = "eu-west-3b"
  map_public_ip_on_launch = true

  tags = {
    Name = "tearoom-public-subnet-2"
  }
}



resource "aws_security_group" "ecs_sg" {
  name        = "ecs-allow-http"
  description = "Allow HTTP traffic to ECS service"
  vpc_id      = "vpc-04859a84539547d8e"

  ingress {
    description = "Allow HTTP from anywhere"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow all outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ecs-allow-http"
  }
}


resource "aws_lb" "alb" {
  name               = "tearoom-alb"
  load_balancer_type = "application"
  security_groups    = [aws_security_group.ecs_sg.id]
  subnets            = ["subnet-0cf9d9b28ab103df3", aws_subnet.tearoom_public_subnet_2.id]

  enable_deletion_protection = false

  tags = {
    Name = "Tearoom ALB"
  }
}



resource "aws_lb_target_group" "backend_tg" {
  name     = "backend-tg"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = "vpc-04859a84539547d8e"

  target_type = "ip"
  health_check {
    path                = "/"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200"
  }
}


resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend_tg.arn
  }
}


resource "aws_ecs_service" "backend" {
  name            = "tearoom-backend-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets         = ["subnet-0cf9d9b28ab103df3"]     
    security_groups = [aws_security_group.ecs_sg.id]         
    #assign_public_ip = true 
    #le ALB aura une IP publique, pas Fargate
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.backend_tg.arn
    container_name   = "tearoom-backend"
    container_port   = 3000
  }

  #Le Load Balancer a une DNS publique stable
  #Il redirige les requêtes HTTP -> tâche ECS (backend)
}