const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Is Must Required"]
    },
    fathername: {
        type: String,
        required: [true, "fathername Is Must Required"]
    },
    mothername: {
        type: String,
        required: [true, "mothername Is Must Required"]
    },
    age: {
        type: String,
        required: [true, "Age is must Required"]
    },
    gender: {
        type: String,
        required: [true, "gender Is Must Required"]
    },
    dateofbirth: {
        type: String,
        required: [true, "dateofbirth Is Must Required"]
    },
    birthplace: {
        type: String,
        required: [true, "birthplace Is Must Required"]
    },
    height: {
        type: String,
        required: [true, "height Is Must Required"]
    },
    siblings: {
        type: String,
        required: [true, "siblings Is Must Required"]
    },
    religion: {
        type: String,
        required: [true, "religion Is Must Required"]
    },
    cast: {
        type: String,
        required: [true, "cast Is Must Required"]
    },
    subcast: {
        type: String,
        required: [true, "subcast Is Must Required"]
    },
    gotra: {
        type: String,
        required: [true, "gotra Is Must Required"]
    },
    ggotra: {
        type: String,
        required: [true, "Grand Mother gotra Is Must Required"]
    },
    mgotra: {
        type: String,
        required: [true, "Mother gotra Is Must Required"]
    },
    education: {
        type: String,
        required: [true, "education Is Must Required"]
    },
    companyname: {
        type: String,
    },
    salary: {
        type: String,
    },
    address: {
        type: String,
        required: [true, "address Is Must Required"]
    },
    pin: {
        type: String,
        required: [true, "pin Is Must Required"]
    },
    city: {
        type: String,
        required: [true, "city Is Must Required"]
    },
    state: {
        type: String,
        required: [true, "state Is Must Required"]
    },
    email: {
        type: String,
        required: [true, "email Is Must Required"],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "phone Is Must Required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password Is Must Required"]
    },
    image: {
        type: String,
        required: [true, "image Is Must Required"]
    },
})

const user = mongoose.model("user", userschema)

module.exports = user;