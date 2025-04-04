const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

console.log(
    process.env.DB_NAME, 
    process.env.DB_USERNAME
)

const sequelizeClient = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USERNAME, 
    process.env.DB_PWD,
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        port: process.env.DB_PORT,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        }
    }
);

module.exports = sequelizeClient
