import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
const app = express()
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
)
app.use(cookieParser())
app.use(express.json())
app.use('/user', userRoutes)

const runServer = async () => {
  const connected = await mongoose.connect(process.env.MONGO_URL)
  if (!connected) {
    return console.error({
      message: 'Internal server error: could not connect to the database',
    })
  }
  app.listen(process.env.PORT, (err) => {
    if (err) {
      console.error({ message: 'failed: to connect the the server' })
    }
    console.log(`server running on http://localhost:${process.env.PORT}`)
  })
}

runServer()
