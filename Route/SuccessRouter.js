const { createRecord, getRecord, getSingleRecord, deleteRecord, updateRecord } = require("../Controllar/SuccessControllar")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./Public/Success")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

const successRouter = require("express").Router()

successRouter.post("/success", upload.single("image"), createRecord)
successRouter.get("/success", getRecord)
successRouter.get("/success/:_id", getSingleRecord)
successRouter.delete("/success/:_id", deleteRecord)
successRouter.put("/success/:_id", upload.single("image"), updateRecord)

module.exports = successRouter