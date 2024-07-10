const mongoose = require("mongoose")

const bannerschema = new mongoose.Schema({
    image:{
        type:String
    }
})

const banner = mongoose.model("Banner" , bannerschema)

module.exports = banner