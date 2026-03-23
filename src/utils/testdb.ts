import pool from "../config/db"

const testDB = async() => {
  try {
    const res = await pool.query('SELECT NOW()')
    console.log('DB Connected:', res.rows)
  } catch (err) {
    console.error('DB Error:', err)
  }
}

export default testDB