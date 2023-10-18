const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    url : String
})

module.exports = mongoose.model("img_url_test",schema)