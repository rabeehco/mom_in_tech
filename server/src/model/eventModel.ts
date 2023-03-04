import { Schema, model } from 'mongoose'

interface IEvent {
    title: string,
    description: string,
    location: string,
    link: string,
    username: string,
}

const EventSchema = new Schema<IEvent>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },

    
    link: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    }
}, { timestamps: true })

module.exports = model<IEvent>('event', EventSchema)