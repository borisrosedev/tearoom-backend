terraform {
  cloud {
    organization = "TeaRoom"

    workspaces {
      name = "tearoom-backend"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.1.2"
}
