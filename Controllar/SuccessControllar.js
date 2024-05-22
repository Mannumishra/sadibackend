const successstory = require("../Model/SuccessStorySchema")
const cloudinary = require("cloudinary").v2
const fs = require("fs")

cloudinary.config({
    cloud_name: "dsimn9z1r",
    api_key: "998919427255124",
    api_secret: "h-PsVovtSvzakWubj1X8sXJEtp4"
})

const uploadimage = async (file) => {
    try {
        const uplodefile = await cloudinary.uploader.upload(file)
        return uplodefile.secure_url
    } catch (error) {
        console.log(error)
    }
}
const createRecord = async (req, res) => {
    try {
        const { husbandname, wifename, successstory } = req.body
        if (!husbandname || !wifename || !successstory) {
            return res.status(403).json({
                success: false,
                mess: "Fill are fields"
            })
        }
        else {
            const data = new successstory({ husbandname, wifename, successstory })
            if (req.file) {
                const imageurl = await uploadimage(req.file.path)
                data.image = imageurl
            }
            await data.save()
            res.status(200).json({
                success: true,
                mess: "Success Story Created",
                data: data
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server error"
        })
    }
}

module.exports = {
    createRecord: createRecord
}