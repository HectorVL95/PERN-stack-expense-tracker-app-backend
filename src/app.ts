import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import testDB from './utils/testdb'

const app = express()

testDB()

app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`)
})