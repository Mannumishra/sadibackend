const { createRecord, getRecord, getSingleRecord, login, updateRecord, deleteRecord, forgetpassword1, forgetpassword2, forgetpassword3 } = require("../Controllar/UserControllar")
const upload = require("../Middleware/middleware")


const userRouter = require("express").Router()

userRouter.post("/user", upload.single("image"), createRecord)
userRouter.get("/user", getRecord)
userRouter.get("/user/:_id", getSingleRecord)
userRouter.put("/user/:_id", upload.single("image"), updateRecord)
userRouter.post("/user/login", login)
userRouter.delete("/user/:_id", deleteRecord)
userRouter.post("/user/send-otp", forgetpassword1)
userRouter.post("/user/verify-otp", forgetpassword2)
userRouter.post("/user/reset-password", forgetpassword3)

module.exports = userRouter