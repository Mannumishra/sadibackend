const user = require("../Model/UserSchema")
const passwordvalidator = require("password-validator")
const bcrypt = require("bcrypt")
const fs = require("fs")
const jwt = require("jsonwebtoken")
const { uploadCloundanary } = require("../Utils/cloundanry")
const { transporter } = require("../Utils/nodemailer")

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
        console.log(req.body)
        const { name, fathername, mothername, age, gender, dateofbirth, birthplace, height, siblings, religion, cast, subcast, gotra, ggotra, mgotra, education, address, pin, city, state, email, phone, password, salary, companyname } = req.body
        if (!name || !fathername || !mothername || !age || !gender || !dateofbirth || !birthplace || !height || !siblings || !religion || !cast || !subcast || !gotra || !mgotra || !ggotra || !education || !address || !pin || !city || !state || !email || !phone || !password) {
            return res.status(403).json({
                success: false,
                message: "Please fill are Required Fields"
            })
        }
        if (req.body.password && schema.validate(req.body.password)) {
            const existingUser = await user.findOne({
                $or: [
                    { email: email },
                    { phone: phone }
                ]
            });
            if (existingUser) {
                return res.status(403).json({
                    success: false,
                    message: existingUser.email === email ? "Email is already registered" : "Phone number is already registered"
                });
            }
            let data = new user({ name, fathername, mothername, gender, dateofbirth, birthplace, age, height, siblings, religion, cast, subcast, gotra, mgotra, ggotra, education, address, pin, city, state, email, phone, password, companyname, salary })
            bcrypt.hash(data.password, 12, async (error, hash) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: "Internal Server Error"
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
                        message: "User Signup Successfully Complete",
                        data: data
                    })
                }
            })
        }
        else {
            return res.status(403).json({
                success: false,
                message: "Your password must be at least 6 characters, include an uppercase letter, a number, and a special symbol."
            })
        }

    } catch (error) {
        console.log(error)
        if (error.keyValue.email) {
            res.status(403).json({
                success: false,
                message: "Email Is is Already Register"
            })
        }
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getRecord = async (req, res) => {
    try {
        let data = await user.find()
        res.status(200).json({
            success: true,
            message: "User Record Found",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const getSingleRecord = async (req, res) => {
    try {
        let data = await user.findOne({ _id: req.params._id })
        res.status(200).json({
            success: true,
            message: "User Record Found",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
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
                const imageurl = await uploadCloundanary(req.file.path)
                data.image = imageurl
            }
            await data.save()
            try {
                fs.unlinkSync(req.file.path)
            } catch (error) { }
            res.status(200).json({
                success: true,
                message: "Record Updated Successfully",
                data: data
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const deleteRecord = async (req, res) => {
    try {
        let data = await user.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.status(200).json({
                success: true,
                message: "User Record Deleted",
                data: data
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const login = async (req, res) => {
    try {
        console.log(req.body)
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
                        res.status(500).json({ success: false, messageage: "Internal Server Error" })
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
                message: "Invaild Email id"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const forgetpassword1 = async (req, res) => {
    try {
        const data = await user.findOne({ email: req.body.email })
        if (data) {
            let otp = parseInt(Math.random() * 1000000)
            data.otp = otp
            await data.save()
            const mailOptions = {
                from: process.env.MAIL_SENDER,
                to: data.email,
                subject: "Password Reset OTP - Sitaram Marriage Bureau",
                html: `
                    <html>
                    <body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0;">
                        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; box-sizing: border-box;">
                            <img src="https://sitarammarriagebureau.com/static/media/image.5d600b10130a8f519a91.png" alt="Sitaram Marriage Bureau Logo" style="display: block; margin: 0 auto; width: 200px;"/>
                            <h2 style="color: #0056b3; font-size: 24px; margin: 0 0 10px;">Hello ${data.name},</h2>
                            <p style="font-size: 16px; margin: 0 0 10px;">We received a request to reset your password. To complete the process, please use the OTP below:</p>
                            <h3 style="font-size: 24px; color: #e74c3c; margin: 0 0 10px;">${data.otp}</h3>
                            <p style="font-size: 14px; color: #555; margin: 0 0 20px;">For security reasons, please do not share this OTP with anyone. If you did not request a password reset, you can safely ignore this email.</p>
                            <p style="margin: 0 0 10px;">Thank you,<br>
                            <strong>Sitaram Marriage Bureau</strong></p>
                            <p style="font-size: 12px; color: #aaa; margin: 0;">If you have any questions or need further assistance, please contact our support team.</p>
                        </div>
                    </body>
                    </html>
                `
            };
            transporter.sendMail(mailOptions, ((error) => {
                if (error) {
                    return res.status(400).json({ success: false, message: "Invalid Email Address" })
                }
                res.status(200).json({ success: true, message: "OTP Sent on Your Registered Email Address" })
            }))
        }
        else {
            return res.status(404).json({ success: false, message: "Invalid Email Address" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const forgetpassword2 = async (req, res) => {
    try {
        const data = await user.findOne({ email: req.body.email })
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "User Not found"
            })
        }
        else {
            if (data.otp == req.body.otp) {
                res.status(200).json({
                    success: true,
                    message: "Otp Verify successfully"
                })
            }
            else {
                return res.status(404).json({
                    success: false,
                    message: "Invalid Otp "
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Errror"
        })
    }
}

const forgetpassword3 = async (req, res) => {
    try {
        const data = await user.findOne({ email: req.body.email })
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "USerNot Found"
            })
        }
        else {
            if (!req.body.password) {
                return res.status(404).json({
                    success: false,
                    message: "Password must required"
                })
            }
            else if (!schema.validate(req.body.password)) {
                return res.status(404).json({
                    success: false,
                    message: "Your password must be at least 6 characters, include an uppercase letter, a number, and a special symbol."
                })
            }
            else {
                bcrypt.hash(req.body.password, 12, async (error, hash) => {
                    if (error) {
                        return res.status(500).json({
                            success: false,
                            message: "Internal Server Error"
                        })
                    }
                    data.password = hash
                    await data.save()
                    res.status(200).json({
                        success: true,
                        message: "Password Reset successfully"
                    })
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
module.exports = {
    createRecord, createRecord,
    getRecord: getRecord,
    getSingleRecord: getSingleRecord,
    updateRecord: updateRecord,
    login: login,
    deleteRecord: deleteRecord,
    forgetpassword1: forgetpassword1,
    forgetpassword2: forgetpassword2,
    forgetpassword3: forgetpassword3
}