const express = require("express");
const { getAboutData } = require("../controllers/aboutController");

const router = express.Router();

router.get("/about", getAboutData);

module.exports = router;
