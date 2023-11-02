require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 8000
const CLIENT_SECRET = process.env.CLIENT_SECRET

app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

app.use(session({ secret: CLIENT_SECRET, resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.send('PetFind')
})

// Rutas de autenticación
const authRoutes = require('./routes/auth.routes')
app.use('/auth', authRoutes)

// Rutas de tipos de mascotas
const petTypeRoutes = require('./routes/petType.routes')
app.use('/pet-types', petTypeRoutes)

app.get('*', (req, res) => {
  res.send('404| Page not found')
})

app.listen(port, () => {
  console.log(`PetFind corriendo en http://localhost:${port}`)
})
