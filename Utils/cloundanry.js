const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
})

const uploadCloundanary = async (file) => {
    try {
        const uploadfile = await cloudinary.uploader.upload(file)
        return uploadfile.secure_url
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    uploadCloundanary: uploadCloundanary
}