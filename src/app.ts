import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import testDB from './utils/testdb'
import userRoutes from './api/user/userRoutes'
import dateRangeRoutes from './api/date-range/dateRangeRoutes'
import expenseRoutes from './api/expense/expenseRoutes'

const app = express()

testDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', userRoutes)
app.use('/api', dateRangeRoutes)
app.use('/api', expenseRoutes)

app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`)
})