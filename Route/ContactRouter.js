const { createContat, getRecord } = require("../Controllar/ContactControllar")

const contactRouter = require("express").Router()

contactRouter.post("/contact", createContat)
contactRouter.get("/contact", getRecord)

module.exports = contactRouter