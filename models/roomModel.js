const mongoose = require("mongoose")

const RoomSchema = mongoose.Schema({
    roomName: String,
    randomWords: [{
        word: String,
        category: String,
        definition: String
    }],
    Share_URL: String
}, {
    versionKey: false
})

const RoomModel = mongoose.model("room", RoomSchema)

module.exports = RoomModel