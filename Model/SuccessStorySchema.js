const mongoose = require("mongoose")

const successSchema = new mongoose.Schema({
    husbandname:{
        type:String,
        required:[true,"Name is must Required"]
    },
    wifename:{
        type:String,
        required:[true,"Name is must Required"]
    },
    successmess:{
        type:String,
        required:[true,"Success Story  is must Required"]
    },
    image:{
        type:String,
        required:[true,"Image is must Required"]
    },
})

const successstory = mongoose.model("success" , successSchema)

module.exports = successstory