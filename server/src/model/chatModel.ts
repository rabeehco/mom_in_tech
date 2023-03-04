import { Schema, model } from 'mongoose'

interface IChat {
    username: string,
    message: string,
}

const ChatSchema = new Schema<IChat>({
    username: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true })

module.exports = model<IChat>('chat', ChatSchema)