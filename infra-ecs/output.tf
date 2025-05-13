output "cluster_name" {
  value = aws_ecs_cluster.main.name
}

output "task_definition" {
  value = aws_ecs_task_definition.backend.family
}

output "alb_dns_name" {
  value = aws_lb.alb.dns_name
}