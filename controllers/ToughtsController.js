module.exports = class ToughtsController {
  static async homePage(req, res) {
    res.render("toughts/home");
  }

  static async dashboard(req, res) {
    res.render("toughts/dashboard");
  }
};
