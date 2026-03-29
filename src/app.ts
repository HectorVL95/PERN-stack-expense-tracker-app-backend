import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import testDB from './utils/testdb'
import userRoutes from './api/user/userRoutes'

const app = express()

testDB()

app.use(`/api/user/`, userRoutes)

app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`)
})