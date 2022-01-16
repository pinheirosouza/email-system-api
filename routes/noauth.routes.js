const { Router } = require("express");
const { userController } = require("../controllers/user.controller");

const noAuthRoutes = new Router();

noAuthRoutes.get("/", (req, res) => {
  res.send("Hello World! - noauth");
});

noAuthRoutes.post("/user", userController.create);
noAuthRoutes.post("/user/login", userController.login);

module.exports = { noAuthRoutes };
