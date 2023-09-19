const express = require("express");
const router = express.Router();

//Controller
const ToughtsController = require("../controllers/ToughtsController");

const checkAuth = require("../helpers/auth").checkAuth;

router.get("/dashboard", checkAuth, ToughtsController.dashboard);
router.get("/", ToughtsController.homePage);

module.exports = router;
