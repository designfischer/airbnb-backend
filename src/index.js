const express = require('express')
const cors = require('cors')
require('dotenv').config()

const services = require('./services')
const routes = require('./routes')

services.connectToDatabase()

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

const PORT = process.env.PORT || process.env.LOCAL_PORT

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))