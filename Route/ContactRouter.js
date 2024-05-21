const { createContat } = require("../Controllar/ContactControllar")

const contactRouter = require("express").Router()

contactRouter.post("/contact" , createContat)

module.exports = contactRouter