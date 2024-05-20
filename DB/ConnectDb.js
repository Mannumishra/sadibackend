const mongoose = require("mongoose")

const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://mannu22072000:kmAJEjtM4CqhG3Nh@cluster0.xvdvyut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Data Base connected successfully")
}

connectDB()