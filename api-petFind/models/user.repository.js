const pool = require('../configs/db.config')

class User {
  constructor () {
    this.pool = pool
  }

  async create (user) {
    try {
      const query = {
        text: 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        values: [user.name, user.surname, user.email, user.profile_picture]
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
}

module.exports = new User()
