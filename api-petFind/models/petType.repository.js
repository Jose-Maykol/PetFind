const pool = require('../config/db.config')

class PetType {
  constructor () {
    this.pool = pool
  }

  async getAll () {
    try {
      const query = {
        text: 'SELECT * FROM pet_type'
      }
      const result = await this.pool.query(query)
      return result.rows
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = new PetType()
