variable "aws_region" {
    type=string
    default = "eu-west"
    description = "Utilized region"
}



variable "tags" {
  type = map(string)
  default = {}
}

variable "sg_name" {
  type = string 
  default = "web-and-control-sg"
}

variable "vpc_security_group_ids" {
  type = list(string)
  default     = []
}


variable "security_group_id" {
  description = "ID of existing security group whose rules we will manage"
  type        = string
  default     = null
}

variable "instance_type" {
  default = "t2.micro"
  type = string
  description = "backend instance type"
}

variable "vpc_id" {
    type=string
    description = "default vpc identifier"
    default = null
    # nullable = false
}

variable "subnet_id" {
    type=string
    description = "subnet identifier"
    default = null
}

variable "ami_id" {
    type = string
    default     = null
    description = "predefined image used for the VM hosting the backend"
}