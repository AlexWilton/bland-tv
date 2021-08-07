const express = require("express")
const router = express.Router()

const {scheduleTodayEndpoint} = require("./services")

router.get("/scheduleToday", scheduleTodayEndpoint)

module.exports = router;
