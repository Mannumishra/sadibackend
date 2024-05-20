const { createRecord, getRecord, getSingleRecord, login, updateRecord } = require("../Controllar/UserControllar")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./Public/User")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

const userRouter = require("express").Router()

userRouter.post("/user", upload.single("image"), createRecord)
userRouter.get("/user", getRecord)
userRouter.get("/user/:_id", getSingleRecord)
userRouter.put("/user/:_id", upload.single("image"), updateRecord)
userRouter.post("/user/login", login)

module.exports = userRouter