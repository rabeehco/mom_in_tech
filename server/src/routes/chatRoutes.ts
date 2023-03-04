import express from 'express'

const router = express.Router()
const Chat = require('../model/chatModel')
const jwt = require("jsonwebtoken")
const { isAuth } = require("../middleware/Auth");

router.post('/chat', isAuth, async (req, res) => {
    try {
        const { message, username } = req.body
        const chat = new Chat({
            message,
            username
        })
        await chat.save()
        res.send({ message: 'Successfully Saved', status: true })
    } catch (error) {
        res.send({ message: 'Failed to Post chat ' + error.message, status: false })
    }
})

router.get('/chat', async (req, res) => {
    try {
        const chat = await Chat.find()
        res.send({ chat, status: true })
    } catch (error) {
        res.send({ message: 'Failed to Post Chat', status: false })
    }
})

router.post('/chatmessageload', async (req, res) => {
    try {
        const {limit} = req.body
        const chat = await Chat.find().sort({createdAt: -1}).limit(limit)
        res.send({chat})
    } catch (error) {
        res.send({ message: 'Failed to Get chat', status: false })
    }
})

module.exports = router