curl -i -X POST http://tearoom-alb-1498542559.eu-west-3.elb.amazonaws.com/api/v1/user \
  -H "Content-Type: application/json" \
  -d '{"firstName": "luc", "lastName": "doe", "email": "luc@gmail.com", "password": "!10Caroline10!"}'
