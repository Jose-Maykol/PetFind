const pool = require('../config/db.config')

class Report {
  constructor () {
    this.pool = pool
  }

  async create (report) {
    try {
      const query = {
        text: 'INSERT INTO reports (user_id, pet_id, datetime, commnent, coordinates) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        values: [report.user_id, report.pet_id, report.datetime, report.commnent, report.coordinates]
      }
      const result = await this.pool.query(query)
      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async listOwn (userId) {
    try {
      const query = {
        text: 'SELECT * FROM reports WHERE user_id = $1',
        values: [userId]
      }
      const result = await this.pool.query(query)
      return result.rows
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getOwn (userId, reportId) {
    try {
      const query = {
        text: 'SELECT * FROM reports WHERE user_id = $1 AND id = $2',
        values: [userId, reportId]
      }
      const result = await this.pool.query(query)
      return result.rows
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async update (report) {
    try {
      const query = {
        text: 'UPDATE reports SET user_id = $1, pet_id = $2, datetime = $3, commnent = $4, coordinates = $5 WHERE id = $6 RETURNING *',
        values: [report.user_id, report.pet_id, report.datetime, report.commnent, report.coordinates, report.id]
      }
      const result = await this.pool.query(query)
      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async deleteOwn (reportId, userId) {
    try {
      const query = {
        text: 'DELETE FROM reports WHERE id = $1 AND user_id = $2',
        values: [reportId, userId]
      }
      await this.pool.query(query)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = new Report()
