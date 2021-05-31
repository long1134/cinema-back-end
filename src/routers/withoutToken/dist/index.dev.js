"use strict";

var router = require("express").Router();

router.use("/film", require("./film"));
router.use("/cinema", require("./cinema"));
router.use("/showtimes", require("./showtimes"));
router.use("/members", require("./members"));
module.exports = router;