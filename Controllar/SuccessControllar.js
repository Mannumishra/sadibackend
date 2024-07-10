const successstory = require("../Model/SuccessStorySchema")
const fs = require("fs")
const { uploadCloundanary } = require("../Utils/cloundanry")

const createRecord = async (req, res) => {
    try {
        const { description,  subdescription ,date } = req.body
        if (!description ||  !subdescription || !date) {
            return res.status(403).json({
                success: false,
                mess: "Fill are fields"
            })
        }
        else {
            const data = new successstory({ description, subdescription ,date })
            if (req.file) {
                const imageurl = await uploadCloundanary(req.file.path)
                data.image = imageurl
            }
            await data.save()
            try {
                fs.unlinkSync(req.file.path)
            } catch (error) {}
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
            data.description = req.body.description ?? data.description
            data.subdescription = req.body.subdescription ?? data.subdescription
            data.date = req.body.date ?? data.date
            if (req.file) {
                const image_url = await uploadCloundanary(req.file.path)
                data.image = image_url
            }
            await data.save()
            try {
                fs.unlinkSync(req.file.path)
            } catch (error) {}
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
    updateRecord: updateRecord
}