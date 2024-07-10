const bride = require("../Model/Bridemodel")
const { uploadCloundanary } = require("../Utils/cloundanry")
const fs = require("fs")

const createBride = async (req, res) => {
    try {
        console.log("i am hit ")
        console.log(req.body)
        console.log(req.file)
        const { name, bridename } = req.body
        if (!name || !bridename) {
            return res.status(401).json({
                success: false,
                mess: "Fill all required field"
            })
        }
        const data = new bride({ name, bridename })
        const imgurl = await uploadCloundanary(req.file.path)
        data.image = imgurl
        await data.save()
        fs.unlinkSync(req.file.path)
        res.status(200).json({
            success: true,
            mess: "Bride created successfully",
            data: data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: true,
            mess: "Internal Server Error"
        })
    }
}

const getBride = async (req, res) => {
    try {
        let data = await bride.find()
        if (data) {
            res.status(200).json({
                success: true,
                mess: "Bride found successfully",
                data: data
            })
        }
        else {
            res.status(404).json({
                success: true,
                mess: "Bride Not found successfully"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: true,
            mess: "Internal Server Error"
        })
    }
}

const getSingleBride = async (req, res) => {
    try {
        let data = await bride.findOne({ _id: req.params._id })
        if (data) {
            res.status(200).json({
                success: true,
                mess: "Bride found successfully",
                data: data
            })
        }
        else {
            res.status(404).json({
                success: true,
                mess: "Bride Not found successfully"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: true,
            mess: "Internal Server Error"
        })
    }
}

const deleteBride = async (req, res) => {
    try {
        let data = await bride.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.status(200).json({
                success: true,
                mess: "Bride Delete successfully"
            })
        }
        else {
            res.status(404).json({
                success: true,
                mess: "Bride Not found successfully"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: true,
            mess: "Internal Server Error"
        })
    }
}

const updateBride = async (req, res) => {
    try {
        let data = await bride.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.bridename = req.body.bridename ?? data.bridename
            if (req.file) {
                const imgurl = await uploadCloundanary(req.file.path)
                data.image = imgurl
            }
            await data.save()
            res.status(200).json({
                success: true,
                mess: "Bride Updated successfully",
                data: data
            })
        }
        else {
            res.status(404).json({
                success: true,
                mess: "Bride Not found successfully"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: true,
            mess: "Internal Server Error"
        })
    }
}



module.exports = {
    createBride: createBride,
    getBride: getBride,
    getSingleBride: getSingleBride,
    deleteBride: deleteBride,
    updateBride:updateBride
}