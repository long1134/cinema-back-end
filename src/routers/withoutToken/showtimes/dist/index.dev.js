"use strict";

var router = require("express").Router();

require("./get")(router);

require("./pay")(router);

module.exports = router;