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
        const { husbandname, wifename, successmess } = req.body
        if (!husbandname || !wifename || !successmess) {
            return res.status(403).json({
                success: false,
                mess: "Fill are fields"
            })
        }
        else {
            const data = new successstory({ husbandname, wifename, successmess })
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
        console.log(error)
        res.status(500).json({
            success: false,
            mess: "Internal Server error"
        })
    }
}

const getRecord = async (req, res) => {
    try {
        let data = await successstory.find()
        res.status(200).json({
            success: true,
            mess: "Record Found",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}

const getSingleRecord = async (req, res) => {
    try {
        let data = await successstory.findOne({ _id: req.params._id })
        res.status(200).json({
            success: true,
            mess: "Record Found",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}

const updateRecord = async (req, res) => {
    try {
        let data = await successstory.findOne({ _id: req.params._id })
        if (data) {
            data.husbandname = req.body.name ?? data.husbandname
            data.wifename = req.body.name ?? data.wifename
            data.successmess = req.body.name ?? data.successmess
            if (req.file) {
                try {
                    fs.unlinkSync(data.image)
                } catch (error) { }
                const image_url = await uploadimage(req.file.path)
                data.image = image_url
            }
            await data.save()
            res.status(200).json({
                success: true,
                mess: "Record Updated Successfully",
                data: data
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}

const deleteRecord = async (req, res) => {
    try {
        let data = await successstory.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.status(200).json({
                success: true,
                mess: "Record Deleted Successfully",
                data: data
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}

module.exports = {
    createRecord: createRecord,
    getRecord: getRecord,
    getSingleRecord: getSingleRecord,
    deleteRecord: deleteRecord,
    updateRecord:updateRecord
}