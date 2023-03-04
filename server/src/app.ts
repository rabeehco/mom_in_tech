import 'dotenv/config'
import express from 'express'
import { connect } from 'mongoose'
import mongoose from 'mongoose'
import bodyParser, { json } from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'

mongoose.set('strictQuery', true);
const dbUrl: string = process.env.DB_URL || 'mongodb://127.0.0.1:27017/momintech' // dburl is commented
connect(dbUrl).then(() => { console.log('DB Connected') })

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')
const jobRoutes = require('./routes/jobRoutes')
const eventRoutes = require('./routes/eventRoutes')
const chatRoutes = require('./routes/chatRoutes')

app.use('/', userRoutes)
app.use('/', blogRoutes)
app.use('/', jobRoutes)
app.use('/', eventRoutes)
app.use('/', chatRoutes)

app.listen(4005, () => { console.log('Listening to 4005') })
