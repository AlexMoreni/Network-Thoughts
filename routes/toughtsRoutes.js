const express = require("express");
const router = express.Router();

//Controller
const ToughtsControllerController = require("../controllers/ToughtsController");

router.get("/", ToughtsControllerController.homePage);

module.exports = router;
