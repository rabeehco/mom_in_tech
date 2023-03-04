import {Schema, model} from 'mongoose';

interface IJob {
    title: string,
    description: string,
    email: string,
    username: string
}

const JobSchema = new Schema<IJob>({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    }
}, {timestamps: true})

module.exports = model<IJob>('job', JobSchema)
