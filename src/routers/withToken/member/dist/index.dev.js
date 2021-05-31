"use strict";

var router = require("express").Router();

require("./create")(router);

require("./get")(router);

require("./update")(router);

module.exports = router;