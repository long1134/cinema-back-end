const router = require("express").Router()

require("./get")(router)
require("./pay")(router)

module.exports = router