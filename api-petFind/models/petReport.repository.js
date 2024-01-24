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
      console.log(filters)
      const offset = (page - 1) * limit
      let queryString = 'SELECT id, name, loss_date, photo, phone, reward, coordinates FROM pets'
      const filterValues = []
      const filterConditions = []

      if (Object.keys(filters).length > 0) {
        queryString += ' WHERE'
        let params = 1

        if (filters.name) {
          filterValues.push(`%${filters.name}%`)
          filterConditions.push(` name ILIKE $${params}`)
          params++
        }

        if (filters.loss_date_start && filters.loss_date_end) {
          filterValues.push(filters.loss_date_start)
          filterValues.push(filters.loss_date_end)
          filterConditions.push(` loss_date >= $${params} AND loss_date <= $${params + 1}`)
          params += 2
        }

        if (filters.pet_type_ids && filters.pet_type_ids.length > 0) {
          const petTypeIds = filters.pet_type_ids.map((petTypeId, index) => `$${params + index}`).join(',')
          filterValues.push(...filters.pet_type_ids)
          filterConditions.push(` pet_type_id IN (${petTypeIds})`)
          params += filters.pet_type_ids.length
        }

        queryString += filterConditions.join(' AND ')
      }

      queryString += ` OFFSET $${filterValues.length + 1} LIMIT $${filterValues.length + 2}`

      console.log(queryString)
      console.log(filterValues)

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
        text: `
        SELECT
          pets.id,
          pets.name,
          pets.loss_date,
          pets.photo,
          pets.phone,
          pets.reward,
          pets.coordinates,
          COUNT(reports.id) AS report_count
        FROM pets
        LEFT JOIN reports ON pets.id = reports.pet_id
        WHERE pets.user_id = $1
        GROUP BY pets.id
      `,
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
        text: `
        SELECT
          pets.*,
          pet_type.tag AS pet_type_tag
        FROM
          pets
          LEFT JOIN pet_type ON pets.pet_type_id = pet_type.id
        WHERE
          pets.id = $1
        `,
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

        if (filters.loss_date_start && filters.loss_date_end) {
          filterValues.push(filters.loss_date_start)
          filterValues.push(filters.loss_date_end)
          filterConditions.push(` loss_date >= $${params} AND loss_date <= $${params + 1}`)
          params++
        }

        if (filters.pet_type_ids && filters.pet_type_ids.length > 0) {
          const petTypeIds = filters.pet_type_ids.map((petTypeId, index) => `$${params + index}`).join(',')
          filterValues.push(...filters.pet_type_ids)
          filterConditions.push(` pet_type_id IN (${petTypeIds})`)
          params += filters.pet_type_ids.length
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
        text: `
        SELECT
          reportingUser.name AS user_name,
          reportingUser.surname AS user_surname,
          reportingUser.profile_picture AS user_profile_picture,
          reportingUser.email AS user_email,
          reports.comment AS report_comment,
          reports.datetime AS report_datetime,
          reports.coordinates AS report_coordinates
        FROM
          reports
        INNER JOIN
          pets ON reports.pet_id = pets.id
        INNER JOIN
          users AS reportingUser ON reports.user_id = reportingUser.id
        WHERE 
          reports.pet_id = $1
        `,
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
