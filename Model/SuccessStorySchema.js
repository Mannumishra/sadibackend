const mongoose = require("mongoose")

const successSchema = new mongoose.Schema({
    description:{
        type:String,
        required:[true,"description is must Required"]
    },
    subdescription:{
        type:String,
        required:[true,"subdescription is must Required"]
    },
    date:{
        type:String,
        required:[true,"date is must Required"]
    },
    image:{
        type:String,
        required:[true,"Image is must Required"]
    },
})

const successstory = mongoose.model("success" , successSchema)

module.exports = successstory