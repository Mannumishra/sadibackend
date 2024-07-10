const express = require("express")
require("dotenv").config()
require("./DB/ConnectDb")

const cors = require("cors")
const userRouter = require("./Route/UserRouter")
const contactRouter = require("./Route/ContactRouter")
const successRouter = require("./Route/SuccessRouter")
const bannerRouter = require("./Route/Bannerrouter")
const brideRouter = require("./Route/BrideRoute")
const app = express()

app.use(cors())
app.use(express.json())
app.set(express.static("./Public"))

app.use("/api", userRouter)
app.use("/api", contactRouter)
app.use("/api", successRouter)
app.use("/api", bannerRouter)
app.use("/api", brideRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`)
})