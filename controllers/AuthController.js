const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = class AuthController {
  static async login(req, res) {
    res.render("auth/login");
  }

  static async register(req, res) {
    res.render("auth/register");
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      req.flash("message", "As senhas não conferem, verifique e corrija");
      res.render("auth/register");

      return;
    }

    const checkIfUserExist = await User.findOne({ where: { email: email } });

    if (checkIfUserExist) {
      req.flash("message", "O email já está em umso!");
      res.render("auth/register");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email: email,
      password: hashedPassword,
    };

    try {
      const cratedUser = await User.create(user);

      //initialize session
      req.session.userid = cratedUser.id;

      req.flash("message", "Cadastro realizado com sucesso!");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (err) {
      console.log(err);
    }
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/");
  }
};
