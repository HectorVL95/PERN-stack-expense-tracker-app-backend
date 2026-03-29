import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.DB_PORT || 5432),
  // Add this block below:
  ssl: {
    rejectUnauthorized: false 
  }
});

export default pool;