const { createBanner, getBanner, getSingleBanner, deleteBanner, updateBanner } = require("../Controllar/BannerControllar")
const upload = require("../Middleware/middleware")

const bannerRouter = require("express").Router()

bannerRouter.post("/banner" , upload.single("image") , createBanner)
bannerRouter.put("/banner/:_id" , upload.single("image") , updateBanner)
bannerRouter.get("/banner" , getBanner)
bannerRouter.get("/banner/:_id" , getSingleBanner)
bannerRouter.delete("/banner/:_id" , deleteBanner)

module.exports = bannerRouter