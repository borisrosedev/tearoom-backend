 variable "sg_name" {
    type = string
}

variable "vpc_id" {
  type = string
}

variable "sg_description" {
    type = string
}


variable "ingress_rules" {
  description = "ingress rules"
  type = list(object({
    description = string
    from_port   = number
    to_port     = number
    protocol    = string
    cidr_blocks = list(string)
  }))
}

variable "egress_rules" {
  description = "egress rules"
  type = list(object({
    description = string
    from_port   = number
    to_port     = number
    protocol    = string
    cidr_blocks = list(string)
  }))
}

variable "tags" {
  description = "Tags appliqués à la ressource"
  type        = map(string)
  default     = {}
}