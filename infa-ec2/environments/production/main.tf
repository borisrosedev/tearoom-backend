module "sg" {
  source = "../../modules/sg"
  sg_name = var.sg_name
  sg_description = "Security Group for Open Subnet for Backend"
  vpc_id = var.vpc_id
  
  
  ingress_rules = [
    {
      description = "SSH from anywhere"
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    },
    {
      description = "HTTP from anywhere"
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    },
    {
      description = "HTTPS from anywhere"
      from_port   = 443
      to_port     = 443
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    },

  ]

  egress_rules = [
    {
      description = "All Outbound"
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_blocks = ["0.0.0.0/0"]
    }
  ]
  
  
    tags = {
         Name = "TeaRoomBackendSecurityGroup"
    }
}



module "backend_module" {
  source = "../../modules/ec2_backend"
  vpc_security_group_ids = [module.sg.security_group_id]
  vpc_id = module.sg.id
  instance_type = var.instance_type
  subnet_id = var.subnet_id
  ami_id = var.ami_id
  tags = {
    Name = "ProductionBackendServer"
  }
}

