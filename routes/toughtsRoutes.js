const express = require("express");
const router = express.Router();

//Controller
const ToughtsController = require("../controllers/ToughtsController");

const checkAuth = require("../helpers/auth").checkAuth;

router.get("/create", checkAuth, ToughtsController.createTought);
router.post("/create", checkAuth, ToughtsController.createToughtSave);
router.get("/edit/:id", checkAuth, ToughtsController.editTought);
router.post("/edit", checkAuth, ToughtsController.editToughtSave);
router.get("/dashboard", checkAuth, ToughtsController.dashboard);
router.post("/remove", checkAuth, ToughtsController.removeTought);
router.get("/", ToughtsController.homePage);

module.exports = router;
