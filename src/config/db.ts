import pkg from 'pg'
const {Pool} = pkg
import dotenv from 'dotenv'
dotenv.config()

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: 5432,
  password: process.env.PGPASSWORD,
  ssl: {
    rejectUnauthorized: false 
  }
})

export default pool