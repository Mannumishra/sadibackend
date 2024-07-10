const mongoose = require("mongoose")

const brideSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , "bridename is must required"]
    },
    bridename:{
        type:String,
        required:[true , "bridename is must required"]
    },
    image:{
        type:String,
        required:[true , "bride Image is must required"]
    }
})

const bride = mongoose.model("bride" , brideSchema)

module.exports = bride