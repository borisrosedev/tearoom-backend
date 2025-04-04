const express = require("express");
const cors = require("cors");
const connectToDB = require("./app/database/connectToDB");
const dotenv = require("dotenv");
const userRoutes = require('./app/routes/user');
dotenv.config();

const app = express();
connectToDB()
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({
  extended: true
}))
app.use(cors());

app.set("port", process.env.SERVER_PORT);
app.set("host", process.env.SERVER_HOST);

app.use('/api/v1/user', userRoutes)

app.listen(app.get("port"), function () {
  console.log(`🚀 Server running at ${app.get("host")} : ${app.get("port")} `);
});
