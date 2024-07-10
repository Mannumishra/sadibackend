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
        res.status(200).json({
            success: true,
            mess: "Banner created successfully",
            data: data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: error
        })
    }
}


const getBanner = async (req, res) => {
    try {
        let data = await banner.find()
        if (data) {
            res.status(200).json({
                success: true,
                mess: "Banner found successfully",
                data: data
            })
        }
        else {
            res.status(403).json({
                success: false,
                mess: "Banner Not found"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}


const getSingleBanner = async (req, res) => {
    try {
        let data = await banner.findOne({ _id: req.params._id })
        if (data) {
            res.status(200).json({
                success: true,
                mess: "Banner found successfully",
                data: data
            })
        }
        else {
            res.status(403).json({
                success: false,
                mess: "Banner Not found"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}



const updateBanner = async (req, res) => {
    try {
        let data = await banner.findOne({ _id: req.params._id })
        if (data) {
            if (req.file) {
                const imgurl = await uploadCloundanary(req.file.path)
                data.image = imgurl
                await data.save()
                try {
                    fs.unlinkSync(req.file.path)
                } catch (error) { }
                res.status(200).json({
                    success: true,
                    mess: "Banner updated successfully"
                })
            }
        }
        else {
            res.status(403).json({
                success: false,
                mess: "Banner Not found"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}

const deleteBanner = async (req, res) => {
    try {
        let data = await banner.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.status(200).json({
                success: true,
                mess: "Banner Deleted successfully"
            })
        }
        else {
            res.status(403).json({
                success: false,
                mess: "Banner Not found"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}


module.exports = {
    createBanner: createBanner,
    getBanner: getBanner,
    getSingleBanner: getSingleBanner,
    deleteBanner: deleteBanner,
    updateBanner: updateBanner
}