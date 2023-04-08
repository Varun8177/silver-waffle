const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const connection = require("./config/db")
const RoomRouter = require("./routes/roomRoutes")
const UserRouter = require("./routes/userRoutes")
require("dotenv").config()
const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send({
        message: "Home Page"
    })
})

app.use("/rooms", RoomRouter)

app.use("/users", UserRouter)

app.listen(process.env.Port, async () => {
    try {
        await connection
        console.log("Connect to DB")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`Running at port ${process.env.Port}`)
})