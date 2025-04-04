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

#terraform destroy
```
