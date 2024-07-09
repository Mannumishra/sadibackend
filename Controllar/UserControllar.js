const user = require("../Model/UserSchema")
const passwordvalidator = require("password-validator")
const bcrypt = require("bcrypt")
const fs = require("fs")
const jwt = require("jsonwebtoken")
const { uploadCloundanary } = require("../Utils/cloundanry")

const schema = new passwordvalidator()
schema
    .is().min(6)
    .is().max(10)
    .has().uppercase(1)
    .has().lowercase(1)
    .has().digits(1)
    .has().symbols(1)
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123']);

const createRecord = async (req, res) => {
    try {
        const { name, fathername, mothername, age, gender, dateofbirth, birthplace, height, siblings, religion, cast, subcast, gotra, ggotra, mgotra, education, address, pin, city, state, email, phone, password, salary, companyname } = req.body
        if (!name || !fathername || !mothername || !age || !gender || !dateofbirth || !birthplace || !height || !siblings || !religion || !cast || !subcast || !gotra || !mgotra || !ggotra || !education || !address || !pin || !city || !state || !email || !phone || !password) {
            return res.status(403).json({
                success: false,
                mess: "Please fill are Required Fields"
            })
        }
        if (req.body.password && schema.validate(req.body.password)) {
            let data = new user({ name, fathername, mothername, gender, dateofbirth, birthplace, age, height, siblings, religion, cast, subcast, gotra, mgotra, ggotra, education, address, pin, city, state, email, phone, password, companyname, salary })
            bcrypt.hash(data.password, 12, async (error, hash) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        mess: "Internal Server Error"
                    })
                }
                else {
                    data.password = hash
                    if (req.file) {
                        const imageurl = await uploadCloundanary(req.file.path)
                        data.image = imageurl
                    }
                    await data.save()
                    try {
                        fs.unlinkSync(req.file.path)
                    } catch (error) { }
                    res.status(200).json({
                        success: true,
                        mess: "User Signup Successfully Complete",
                        data: data
                    })
                }
            })
        }
        else {
            return res.status(403).json({
                success: false,
                mess: "Password is must be strong"
            })
        }

    } catch (error) {
        if (error.keyValue.email) {
            return res.status(403).json({
                success: false,
                mess: "Email Is is Already Register"
            })
        }
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}

const getRecord = async (req, res) => {
    try {
        let data = await user.find()
        res.status(200).json({
            success: true,
            mess: "User Record Found",
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
        let data = await user.findOne({ _id: req.params._id })
        res.status(200).json({
            success: true,
            mess: "User Record Found",
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
        console.log(req.body)
        let data = await user.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.fathername = req.body.fathername ?? data.fathername
            data.mothername = req.body.mothername ?? data.mothername
            data.age = req.body.age ?? data.age
            data.gender = req.body.gender ?? data.gender
            data.dateofbirth = req.body.dateofbirth ?? data.dateofbirth
            data.birthplace = req.body.birthplace ?? data.birthplace
            data.height = req.body.height ?? data.height
            data.siblings = req.body.siblings ?? data.siblings
            data.companyname = req.body.companyname ?? data.companyname
            data.salary = req.body.salary ?? data.salary
            data.religion = req.body.religion ?? data.religion
            data.cast = req.body.cast ?? data.cast
            data.subcast = req.body.subcast ?? data.subcast
            data.gotra = req.body.gotra ?? data.gotra
            data.mgotra = req.body.mgotra ?? data.mgotra
            data.ggotra = req.body.ggotra ?? data.ggotra
            data.education = req.body.education ?? data.education
            data.address = req.body.address ?? data.address
            data.pin = req.body.pin ?? data.pin
            data.city = req.body.city ?? data.city
            data.state = req.body.state ?? data.state
            data.email = req.body.email ?? data.email
            data.phone = req.body.phone ?? data.phone
            if (req.file) {
                try {
                    fs.unlinkSync(data.image)
                } catch (error) { }
                const imageurl = await uploadCloundanary(req.file.path)
                data.image = imageurl
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
        let data = await user.findOne({ _id: req.params._id })
        if (data) {
            try {
                fs.unlinkSync(data.image)
            } catch (error) { }
            await data.deleteOne()
            res.status(200).json({
                success: true,
                mess: "User Record Deleted",
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

const login = async (req, res) => {
    try {
        // console.log(req.body)
        let data = await user.findOne({
            $or: [
                { email: req.body.email },
                { phone: req.body.phone }
            ]
        })
        if (data) {
            const isPasswordValid = await bcrypt.compare(req.body.password, data.password)
            if (isPasswordValid) {
                let key = process.env.SALT_KEY
                jwt.sign({ data }, key, { expiresIn: 1296000 }, (error, token) => {
                    if (error) {
                        res.status(500).json({ success: false, message: "Internal Server Error" })
                    }
                    else {
                        res.status(200).json({ success: true, data: data, token: token })
                    }
                })
            }
        }
        else {
            return res.status(403).json({
                success: false,
                mess: "Invaild Email id"
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
    createRecord, createRecord,
    getRecord: getRecord,
    getSingleRecord: getSingleRecord,
    updateRecord: updateRecord,
    login: login,
    deleteRecord: deleteRecord
}