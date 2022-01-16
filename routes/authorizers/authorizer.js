const { Router } = require("express");
const { verify } = require("jsonwebtoken");
const { secret_key } = require("../../configs/application.config");
const { HttpResponse } = require("../../helpers/httpResponse.helper");
const userService = require("../../services/user.service");

const authorizer = Router();

authorizer.use(async function (req, res, next) {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json(HttpResponse.unauthorized("Token não informado"));
  }

  try {
    const decoded = verify(token, secret_key);
    if (!decoded._id) {
      throw new Error("Token inválido");
    }
    const user = await userService.findOne({ _id: decoded._id });
    if (!user) {
      throw new Error("Token inválido");
    }
    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json(HttpResponse.unauthorized("Token inválido"));
  }
});

module.exports = authorizer;
