const axios = require('axios')

const showInfoEndpoint = async (req, res, next) => {
    const show_id = req.params.show_id
    if (!show_id) throw Error("Please provide show_id with request")
    
    const result = (await axios.get(`https://api.tvmaze.com/shows/${show_id}`)).data
    res.status(200).send({result})
}

module.exports = {
    showInfoEndpoint
}