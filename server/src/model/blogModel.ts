import {Schema, model} from 'mongoose'

interface IBlog {
    title: string,
    body: string,
    username: string,
    like: Array<string>,
}

const BlogSchema = new Schema<IBlog>({
    title: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
      username: {
        type: String,
      },
      like: [{
        type: String,
        default: []
      }],
}, {timestamps: true})

module.exports = model<IBlog>('blog', BlogSchema)