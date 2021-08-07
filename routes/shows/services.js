const axios = require('axios')

const showInfoEndpoint = async (req, res, next) => {
    const show_id = req.params.show_id
    if (!show_id) throw Error("Please provide show_id with request")

    const showResult = (await axios.get(`https://api.tvmaze.com/shows/${show_id}`)).data
    
    try {
        const castResult = (await axios.get(`https://api.tvmaze.com/shows/${show_id}/cast`)).data
        showResult.cast = castResult
    } catch (err) {
        console.log(`Error getting cast`)
    }
    
    res.status(200).send(showResult)
}

module.exports = {
    showInfoEndpoint
}