const pool = require('../config/db.config')

class User {
  constructor () {
    this.pool = pool
  }

  async create (user) {
    try {
      const query = {
        text: 'INSERT INTO users (name, surname, email, profile_picture) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [user.name, user.surname, user.email, user.profile_picture]
      }
      const result = await this.pool.query(query)
      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async findById (id) {
    try {
      const query = {
        text: 'SELECT * FROM users WHERE id = $1',
        values: [id]
      }
      const result = await this.pool.query(query)
      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async findByEmail (email) {
    try {
      const query = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email]
      }
      const result = await this.pool.query(query)
      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async saveToken (userId, accessToken) {
    try {
      const query = {
        text: 'INSERT INTO tokens (user_id, access_token) VALUES ($1, $2)',
        values: [userId, accessToken]
      }
      await this.pool.query(query)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = new User()
