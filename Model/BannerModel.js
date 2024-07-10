const mongoose = require("mongoose")

const bannerschema = new mongoose.Schema({
    image:{
        type:String,
        required:[true,"Banner is must required"]
    }
})

const banner = mongoose.model("Banner" , bannerschema)

module.exports = banner