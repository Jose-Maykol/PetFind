const pool = require('../config/db.config')

class Pet {
  constructor () {
    this.pool = pool
  }

  async create (pet) {
    try {
      const query = {
        text: 'INSERT INTO pets (user_id, pet_type_id, report_status_id, name, age_years, age_months, description, loss_date, photo, phone, reward, coordinates) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id',
        values: [pet.user_id, pet.pet_type_id, pet.report_status_id, pet.name, pet.age_years, pet.age_months, pet.description, pet.loss_date, pet.photo, pet.phone, pet.reward, pet.coordinates]
      }
      const result = await this.pool.query(query)
      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async update (pet) {
    try {
      const query = {
        text: 'UPDATE pets SET user_id = $1, pet_type_id = $2, report_status_id = $3, name = $4, age_years = $5, age_months = $6, description = $7, loss_date = $8, photo = $9, phone = $10, reward = $11, coordinates = $12 WHERE id = $13 RETURNING *',
        values: [pet.user_id, pet.pet_type_id, pet.report_status_id, pet.name, pet.age_years, pet.age_months, pet.description, pet.loss_date, pet.photo, pet.phone, pet.reward, pet.coordinates, pet.id]
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

  async listOwn (id) {
    try {
      const query = {
        text: 'SELECT id, name, loss_date, photo, phone, reward, coordinates FROM pets WHERE user_id = $1',
        values: [id]
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
        text: 'SELECT pets.*, users.name AS user_name, users.surname AS user_surname, users.profile_picture AS user_profile_picture FROM pets INNER JOIN users ON pets.user_id = users.id WHERE pets.id = $1',
        values: [id]
      }
      const result = await this.pool.query(query)
      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getOwn (id, userId) {
    try {
      const query = {
        text: 'SELECT * FROM pets WHERE id = $1 AND user_id = $2',
        values: [id, userId]
      }
      const result = await this.pool.query(query)
      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getUserPets (id) {
    try {
      const query = {
        text: 'SELECT * FROM pets WHERE user_id = $1',
        values: [id]
      }
      const result = await this.pool.query(query)
      return result.rows
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = new Pet()
