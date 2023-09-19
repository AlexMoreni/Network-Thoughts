module.exports = class ToughtsController {
  static async homePage(req, res) {
    res.render("toughts/home");
  }
};
