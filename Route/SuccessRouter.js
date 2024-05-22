const { createRecord } = require("../Controllar/SuccessControllar")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cb(null, './Public/Success')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

const successRouter = require("express").Router()

successRouter.post("/success", upload.single("image"), createRecord)

module.exports = successRouter