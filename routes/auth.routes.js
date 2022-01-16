const { Router } = require("express");
const { mailController } = require("../controllers/mail.controller");
const { userController } = require("../controllers/user.controller");

const authRoutes = new Router();

authRoutes.get("/user", userController.find);

authRoutes.post("/mail", mailController.create);
authRoutes.get("/mail", mailController.find);
authRoutes.put("/mail/:id", mailController.update);
authRoutes.delete("/mail/:id", mailController.delete);

module.exports = { authRoutes };
