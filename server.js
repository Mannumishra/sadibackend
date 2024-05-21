const express = require("express")
require("./DB/ConnectDb")
require("dotenv").config()
const cors = require("cors")
const userRouter = require("./Route/UserRouter")
const contactRouter = require("./Route/ContactRouter")
const app = express()

app.use(cors())
app.use(express.json())
app.set(express.static("./Public"))

app.use("/api", userRouter)
app.use("/api", contactRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`)
})