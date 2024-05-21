const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is must required"]
    },
    email: {
        type: String,
        required: [true, "email is must required"]
    },
    phone: {
        type: String,
        required: [true, "phone is must required"]
    },
    message: {
        type: String,
        required: [true, "message is must required"]
    }
}, { timestamps: true })


const contact = mongoose.model("contact" , contactSchema)

module.exports = contact