const pool = require('../config/db.config')

class Pet {
  constructor () {
    this.pool = pool
  }

  async create (pet) {
    try {
      const query = {
        text: 'INSERT INTO pets (user_id, pet_type_id, report_status_id, name, age_years, age_months, description, loss_date, photo, phone, reward, coordinates) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
        values: [pet.user_id, pet.pet_type_id, pet.report_status_id, pet.name, pet.age_years, pet.age_months, pet.description, pet.loss_date, pet.photo, pet.phone, pet.reward, pet.coordinates]
      }
      const result = await this.pool.query(query)
      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async list () {
    try {
      const query = {
        text: 'SELECT id, name, loss_date, photo, phone, reward, coordinates FROM pets'
      }
      const result = await this.pool.query(query)
      return result.rows
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async get (id) {
    try {
      const query = {
        text: 'SELECT * FROM pets WHERE id = $1',
        values: [id]
      }
      const result = await this.pool.query(query)
      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = new Pet()
