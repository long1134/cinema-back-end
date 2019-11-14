const router = require("express").Router()

require("./create")(router)
require("./get")(router)
require("./delete")(router)

module.exports = router