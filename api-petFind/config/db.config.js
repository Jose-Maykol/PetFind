require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
  sslmode: 'require'
})

module.exports = pool
