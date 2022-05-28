import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import cors from 'cors'

import dciRoutes from './routes/dcis.js'
import brandRoutes from './routes/brands.js'
import medicalTermRoutes from './routes/medicalTerms.js'
import officineRoutes from './routes/officines.js'

dotenv.config()

const app = express()


app.use(bodyParser.json({ limit: '32mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '32mb', extended: true }))
app.use(cors())

app.use('/api/v1/dcis', dciRoutes)
app.use('/api/v1/brands', brandRoutes)
app.use('/api/v1/medical_terms', medicalTermRoutes)
app.use('/api/v1/officines', officineRoutes)

const PORT = process.env.PORT || 5000

connectDB()

app.post('/', (req, res) => {
  res.json(req.body)
})

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on port: ${PORT}`.yellow.bold)
)
