const router = require("express").Router()

router.use("/staff",require("./staff"))
router.use("/film",require("./film"))
router.use("/cinema",require("./cinema"))
router.use("/theater",require("./theater"))
router.use("/showtimes",require("./showtimes"))
router.use("/imgEvent",require("./imgEvent"))
router.use("/member",require("./member"))

module.exports = router