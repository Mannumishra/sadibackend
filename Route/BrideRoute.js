const { createBride, getBride, getSingleBride, deleteBride, updateBride } = require("../Controllar/BrideControllar")
const upload = require("../Middleware/middleware")

const brideRouter = require("express").Router()

brideRouter.post("/bride", upload.single("image"), createBride)
brideRouter.get("/bride", getBride)
brideRouter.get("/bride/:_id", getSingleBride)
brideRouter.delete("/bride/:_id", deleteBride)
brideRouter.put("/bride/:_id", upload.single("image"), updateBride)

module.exports = brideRouter