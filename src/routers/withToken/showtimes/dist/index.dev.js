"use strict";

var router = require("express").Router();

require("./get")(router);

require("./create")(router);

require("./update")(router);

module.exports = router;