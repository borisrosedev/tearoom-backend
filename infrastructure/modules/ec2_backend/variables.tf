variable "ami_id" {
  type = string
  default = null
}
variable "instance_type" {
  type = string
  default = null
}
variable "subnet_id" {
  type = string
  default = null
}

variable "vpc_id" {
  type = string
  default = null
}

variable "vpc_security_group_ids" {
  type = list(string)
  default = []
}
variable "tags" {
  type = map(string)
  default = {}
}