"use strict";

var router = require("express").Router();

router.use("/user/login", require("./login"));
router.use("/h", require("./withToken"));
router.use("/quest", require("./withoutToken"));
module.exports = router;