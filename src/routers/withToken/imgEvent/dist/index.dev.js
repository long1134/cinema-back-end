"use strict";

var router = require("express").Router();

require("./create")(router);

require("./get")(router);

module.exports = router;