```bash
$ npx dotenv-vault@latest push
$ npx dotenv-vault@latest pull
```

## Terraform

https://app.terraform.io/app/TeaRoom/workspaces/tearoom-backend
https://registry.terraform.io/browse/providers?product_intent=terraform
```bash 

terraform init
terraform plan -var-file="terraform.tfvars"
terraform apply -var-file="terraform.tfvars"
terraform output alb_dns_name
#terraform destroy


aws ec2 describe-vpcs --vpc-ids vpc-04859a84539547d8e \
  --query "Vpcs[*].CidrBlock" --output text
```


tearoom-alb-1498542559.eu-west-3.elb.amazonaws.com