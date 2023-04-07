const express = require("express")
const UserModel = require("../models/userModel")
const UserRouter = express.Router()

UserRouter.get("/:roomID", async (req, res) => {
    try {
        const { roomID } = req.params
        const users = await UserModel.find({ roomID })
        res.send(users)
    } catch (error) {
        res.send({
            message: error.message
        })
    }
})

UserRouter.post("/add-user/:roomID", async (req, res) => {
    const { roomID } = req.params
    try {
        const payload = {}
        const { nickname, role, team } = req.body
        if (nickname) {
            payload.nickname = nickname
        } else {
            res.send({
                message: "nickname is required"
            })
        }
        if (role) {
            payload.role = role
        } else {
            payload.role = null
        }
        if (team) {
            payload.team = team
        } else {
            payload.team = null
        }
        payload.roomID = roomID
        const user = new UserModel(payload)
        await user.save()
        res.send(user)
    } catch (error) {
        res.send({
            message: error.message
        })
    }
})
UserRouter.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const users = await UserModel.findByIdAndUpdate({ _id: id }, req.body)
        res.send(users)
    } catch (error) {
        res.send({
            message: error.message
        })
    }
})

module.exports = UserRouter