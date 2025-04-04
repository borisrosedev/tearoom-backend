resource "aws_instance" "backend_server" {
  subnet_id = var.subnet_id
  instance_type = var.instance_type
  vpc_security_group_ids = var.vpc_security_group_ids
  tags = var.tags
}