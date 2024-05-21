const contact = require("../Model/ContactSchema")

const createContat = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body
        if (!name || !email || !phone || !message) {
            return res.status(403).json({
                success: false,
                mess: "Fill All fileds"
            })
        }
        else {
            const data = new contact({ name, phone, email, message })
            await data.save()
            res.status(200).json({
                success: true,
                mess: "Request Send Successfully"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: true,
            mess: "Internal Server Error"
        })
    }
}
const getRecord = async (req, res) => {
    try {
        let data = await contact.find()
        res.status(200).json({
            success: true,
            mess: "Request Send Successfully",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            mess: "Internal Server Error"
        })
    }
}
module.exports = {
    createContat: createContat,
    getRecord:getRecord
}