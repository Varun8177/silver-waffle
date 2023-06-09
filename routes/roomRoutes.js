const express = require("express")
const RoomModel = require("../models/roomModel")
const randomWords = require('random-words');
const wd = require("word-definition");
const RoomRouter = express.Router()


RoomRouter.get("/", async (req, res) => {
    try {
        const data = await RoomModel.find()
        res.send(data)
    } catch (error) {
        res.send({
            message: error.message
        })
    }
})

RoomRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const data = await RoomModel.findOne({ roomName: id })
        res.send(data)
    } catch (error) {
        res.send({
            message: error.message
        })
    }
})

RoomRouter.post("/create-room", async (req, res) => {
    const { userID } = req.body
    try {
        const room = userID
        const words = randomWords({ exactly: 16, maxLength: 6 })
        const RandomWords = await Promise.all(
            words.map((word) =>
                new Promise((resolve) =>
                    wd.getDef(word, "en", null, (definition) => resolve(definition))
                )
            )
        );
        const payload = { roomName: room, randomWords: RandomWords }
        const data = new RoomModel(payload)
        await data.save()
        data.Share_URL = `https://ivory-donkey-suit.cyclic.app/rooms/${data._id}`
        res.send(data)
    } catch (error) {
        res.send({
            message: error.message
        })
    }
})


module.exports = RoomRouter