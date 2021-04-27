const routes = require("express").Router();
const users = require("./user");

routes.use("/user", users);
module.exports = routes;
