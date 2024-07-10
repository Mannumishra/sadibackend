const banner = require("../Model/BannerModel")
const { uploadCloundanary } = require("../Utils/cloundanry")
const fs = require("fs")

const createBanner = async (req, res) => {
    try {
        console.log("I am hit")
        console.log(req.file)
        if (!req.file) {
            return res.status(403).json({
                success: false,
                message: "Please choose an image"
            });
        }
        const imgurl = await uploadCloundanary(req.file.path)
        console.log(imgurl)
        const data = new banner({ image: imgurl })
        await data.save()
        try {
            fs.unlinkSync(req.file.path)
        } catch (error) { }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: error
        })
    }
}


module.exports = { createBanner: createBanner }