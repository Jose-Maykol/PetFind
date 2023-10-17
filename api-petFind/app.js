require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('PetFind')
})

app.get('*', (req, res) => {
  res.send('404| Page not found')
})

app.listen(port, () => {
  console.log(`PetFind corriendo en http://localhost:${port}`)
})
