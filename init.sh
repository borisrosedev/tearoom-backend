#!/bin/bash
git init
touch .env .gitignore server.js
echo "node_modules" >> .gitignore && echo ".env" >> .gitignore
npm init -y
echo "🚀 mandatory dependencies:"
npm install express bcrypt cors
npm jsonwebtoken express-validator dotenv 
npm sequelize pg pg-hstore
