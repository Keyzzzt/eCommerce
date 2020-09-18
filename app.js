const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')


// Keep all requires on top
require('dotenv').config() // allow us to get variables from .env file

//Import Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

// App
const app = express()

// db
// .connect method takes two arguments. First is URL. Second is an object with params.
mongoose.connect('mongodb+srv://Keizt:123AsV@app.clfvn.mongodb.net/App?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('Database connected'))
    .catch(() => console.log('DB ERROR'))

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())

// Routes middleware
app.use('/api', authRoutes)
app.use('/api', userRoutes)




// Run server
const port = process.env.PORT || 8000
//callback in .listen() method is not required
app.listen(port, () => console.log(`Server is running on port ${port}`))