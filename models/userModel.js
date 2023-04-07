const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    nickname: String,
    role: { type: String, default: null },
    team: { type: String, default: null },
    roomID: String
}, {
    versionKey: false
});

const UserModel = mongoose.model("users", userSchema)

module.exports = UserModel