const { Validator } = require("node-input-validator");
const { HttpResponse } = require("../helpers/httpResponse.helper");

const mailService = require("../services/mail.service");
const userService = require("../services/user.service");

const mailController = {
  async create(req, res) {
    const body = { ...req.body, sentBy: res.locals.user._id };

    const schema = {
      subject: "required",
      message: "required",
      receiverEmail: "required",
      sentBy: "required",
    };
    const validator = new Validator(body, schema);
    const bodyIsValid = await validator.check();

    if (!bodyIsValid) {
      return res.json(
        HttpResponse.badRequest("Campo inválido", validator.errors)
      );
    }

    const receiver = await userService.findOne({ email: body.receiverEmail });

    if (!receiver) {
      await mailService.create({
        subject: "Destinatário não encontrado",
        message:
          "Sua última mensagem não foi enviada porque o destinatário não foi encontrado.",
        sentBy: "61df586f0b3220f329a05cd3",
        receivedBy: res.locals.user._id,
      });
      return res.json(
        HttpResponse.badRequest("Usuário destinatário não encontrado")
      );
    }

    body.receivedBy = receiver._id;

    const mail = await mailService.create(body);

    const clientId = Object.keys(global.connectedUsers).find(
      (key) => global.connectedUsers[key] === receiver._id.toString()
    );

    if (clientId) {
      global.io.to(clientId).emit("mail", mail);
    }

    return res.json(HttpResponse.ok("Email enviado com sucesso", mail));
  },

  async find(req, res) {
    const { query } = req;

    const schema = {
      _id: "string",
      receivedBy: "string",
      sentBy: "string",
      deleted: "boolean",
    };

    const validator = new Validator(query, schema);
    const queryIsValid = await validator.check();

    if (!queryIsValid) {
      return res.json(
        HttpResponse.badRequest("Busca inválida", validator.errors)
      );
    }

    if (query.receivedBy == "me") {
      query.receivedBy = res.locals.user._id;
    }

    if (query.sentBy == "me") {
      query.sentBy = res.locals.user._id;
    }

    const mail = await mailService.find({ ...query });

    if (!mail) {
      return res.json(HttpResponse.notFound("Não há emails"));
    }
    return res.json(HttpResponse.ok("Listando emails", mail));
  },

  async update(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.json(HttpResponse.badRequest("Menssagem não especificada"));
    }

    const mail = await mailService.findOne({ _id: id });

    if (!mail) {
      return res.json(HttpResponse.notFound("Menssagem não encontrada"));
    }

    const { body } = req;

    const schema = {
      subject: "string",
      message: "string",
      receiverEmail: "string",
      sentBy: "string",
      read: "boolean",
    };
    const validator = new Validator(body, schema);
    const bodyIsValid = await validator.check();

    if (!bodyIsValid) {
      return res.json(
        HttpResponse.badRequest("Campo inválido", validator.errors)
      );
    }

    await mailService.update({ _id: id }, body);

    return res.json(HttpResponse.ok("Menssagem alterada com sucesso"));
  },

  async delete(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.json(HttpResponse.badRequest("Menssagem não especificada"));
    }

    const mail = await mailService.findOne({ _id: id });

    if (!mail) {
      return res.json(HttpResponse.notFound("Menssagem não encontrada"));
    }

    await mailService.update({ _id: id }, { deleted: true });

    return res.json(HttpResponse.ok("Email deletado com sucesso"));
  },
};

module.exports = { mailController };
