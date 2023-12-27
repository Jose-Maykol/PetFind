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

  async list (page = 1, limit = 12, filters = {}) {
    try {
      const offset = (page - 1) * limit
      let queryString = 'SELECT id, name, loss_date, photo, phone, reward, coordinates FROM pets'
      const filterValues = []
      const filterConditions = []

      if (Object.keys(filters).length > 0) {
        queryString += ' WHERE'
        let params = 1

        if (filters.name) {
          filterValues.push(`%${filters.name}%`)
          filterConditions.push(` name LIKE $${params}`)
          params++
        }

        if (filters.loss_date) {
          filterValues.push(filters.loss_date)
          filterConditions.push(` loss_date = $${params}`)
          params++
        }

        if (filters.pet_type_id) {
          filterValues.push(filters.pet_type_id)
          filterConditions.push(` pet_type_id = $${params}`)
          params++
        }

        queryString += filterConditions.join(' AND ')
      }

      queryString += ` OFFSET $${filterValues.length + 1} LIMIT $${filterValues.length + 2}`

      const query = {
        text: queryString,
        values: [...filterValues, offset, limit]
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

  async getTotal (filters = {}) {
    try {
      let queryString = 'SELECT COUNT(*) FROM pets'
      const filterValues = []
      const filterConditions = []

      if (Object.keys(filters).length > 0) {
        queryString += ' WHERE'
        let params = 1

        if (filters.name) {
          filterValues.push(`%${filters.name}%`)
          filterConditions.push(` name LIKE $${params}`)
          params++
        }

        if (filters.loss_date) {
          filterValues.push(filters.loss_date)
          filterConditions.push(` loss_date = $${params}`)
          params++
        }

        if (filters.pet_type_id) {
          filterValues.push(filters.pet_type_id)
          filterConditions.push(` pet_type_id = $${params}`)
          params++
        }

        queryString += filterConditions.join(' AND ')
      }

      const query = {
        text: queryString,
        values: [...filterValues]
      }
      const result = await this.pool.query(query)
      return result.rows[0].count
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async deleteOwn (id, userId) {
    try {
      const query = {
        text: 'DELETE FROM pets WHERE id = $1 AND user_id = $2',
        values: [id, userId]
      }
      await this.pool.query(query)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateStatus (id, statusId) {
    try {
      const query = {
        text: 'UPDATE pets SET report_status_id = $1 WHERE id = $2 RETURNING *',
        values: [statusId, id]
      }
      const result = await this.pool.query(query)
      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getReportsSightings (id) {
    try {
      const query = {
        text: 'SELECT pets.*, users.name AS user_name, users.surname AS user_surname, users.profile_picture AS user_profile_picture FROM pets INNER JOIN users ON pets.user_id = users.id WHERE pets.report_status_id = 1 AND pets.pet_type_id = (SELECT pet_type_id FROM pets WHERE id = $1)',
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
