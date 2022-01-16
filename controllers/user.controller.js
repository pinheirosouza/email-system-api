const { hashSync, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { Validator } = require("node-input-validator");
const { secret_key } = require("../configs/application.config");
const { HttpResponse } = require("../helpers/httpResponse.helper");

const userService = require("../services/user.service");

const userController = {
  async create(req, res) {
    const { body } = req;
    const schema = {
      email: "required|email",
      password: "required|min:6",
      name: "required",
    };
    const validator = new Validator(body, schema);
    const bodyIsValid = await validator.check();

    if (!bodyIsValid) {
      return res.json(
        HttpResponse.badRequest("Campo inválido", validator.errors)
      );
    }

    const checkUserExists = await userService.find({ email: body.email });

    if (checkUserExists && checkUserExists.length > 0) {
      return res.json(HttpResponse.badRequest("Usuário já cadastrado"));
    }

    req.body.password = hashSync(body.password, 8);

    const user = await userService.create(req.body);
    const token = sign({ _id: user._id }, secret_key);

    return res.json(
      HttpResponse.ok("Usuário cadastrado com sucesso", { user, token })
    );
  },

  async find(req, res) {
    const { query } = req;

    const schema = {
      id: "string",
      email: "email",
    };

    const validator = new Validator(query, schema);
    const queryIsValid = await validator.check();

    if (!queryIsValid || (!query.id && !query.email)) {
      return res.json(
        HttpResponse.badRequest("Busca inválida", validator.errors)
      );
    }

    const user = await userService.find(query);

    if (!user) {
      return res.json(HttpResponse.notFound("Usuário não encontrado"));
    }
    return res.json(HttpResponse.ok("Usuário encontrado", user));
  },

  async login(req, res) {
    const { body } = req;
    const schema = {
      email: "required|email",
      password: "required|min:6",
    };
    const validator = new Validator(body, schema);
    const bodyIsValid = validator.check();
    if (!bodyIsValid) {
      return res.json(
        HttpResponse.badRequest("Campo inválido", validator.errors)
      );
    }
    const user = await userService.findOne({ email: body.email });
    if (!user) {
      return res.json(HttpResponse.notFound("Usuário não encontrado"));
    }

    const matchPassword = await compare(body.password, user.password);

    if (!matchPassword) {
      return res.json(HttpResponse.badRequest("Senha inválida"));
    }

    const token = sign({ _id: user._id }, secret_key);

    return res.json(HttpResponse.ok("Login realizado com sucesso", { token }));
  },
};

module.exports = { userController };
