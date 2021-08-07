const express = require("express")
const router = express.Router()

const {showInfoEndpoint} = require("./services")

router.get("/showInfo/:show_id", showInfoEndpoint)

module.exports = router