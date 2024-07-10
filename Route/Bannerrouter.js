const { createBanner } = require("../Controllar/BannerControllar")
const upload = require("../Middleware/middleware")

const bannerRouter = require("express").Router()

bannerRouter.post("/banner" , upload.single("image") , createBanner)

module.exports = bannerRouter