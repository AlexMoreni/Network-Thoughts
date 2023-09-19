const Tought = require("../models/Toughts");

module.exports = class ToughtsController {
  static async homePage(req, res) {
    res.render("toughts/home");
  }

  static async dashboard(req, res) {
    res.render("toughts/dashboard");
  }

  static async createTought(req, res) {
    res.render("toughts/create");
  }

  static async createToughtSave(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.userid,
    };

    try {
      await Tought.create(tought);

      req.flash("message", "Pensamento criado com sucesso!");

      req.session.save(() => {
        res.render("toughts/dashboard");
      });
    } catch (err) {
      console.log(err);
    }
  }
};
