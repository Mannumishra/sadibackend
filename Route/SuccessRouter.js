const { createRecord, getRecord, getSingleRecord, deleteRecord, updateRecord } = require("../Controllar/SuccessControllar")
const upload = require("../Middleware/middleware")
const successRouter = require("express").Router()

successRouter.post("/success", upload.single("image"), createRecord)
successRouter.get("/success", getRecord)
successRouter.get("/success/:_id", getSingleRecord)
successRouter.delete("/success/:_id", deleteRecord)
successRouter.put("/success/:_id", upload.single("image"), updateRecord)

module.exports = successRouter