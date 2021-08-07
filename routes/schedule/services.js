const axios = require('axios')

const scheduleTodayEndpoint = async (req, res, next) => {
    const result = (await axios.get('https://api.tvmaze.com/schedule?country=GB')).data
    res.status(200).send({result})
}

module.exports = {
    scheduleTodayEndpoint
}