const { createRecord, getRecord, getSingleRecord, login, updateRecord, deleteRecord } = require("../Controllar/UserControllar")
const upload = require("../Middleware/middleware")


const userRouter = require("express").Router()

userRouter.post("/user", upload.single("image"), createRecord)
userRouter.get("/user", getRecord)
userRouter.get("/user/:_id", getSingleRecord)
userRouter.put("/user/:_id", upload.single("image"), updateRecord)
userRouter.post("/user/login", login)
userRouter.delete("/user/:_id", deleteRecord)

module.exports = userRouter