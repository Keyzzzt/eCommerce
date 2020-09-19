const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')


// Keep all requires on top
require('dotenv').config() // allow us to get variables from .env file

//Import Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')

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

/*
* Cross-Origin Resource Sharing (CORS) — механизм, использующий дополнительные HTTP-заголовки,
* чтобы дать возможность агенту пользователя получать разрешения на доступ к выбранным ресурсам с сервера на источнике (домене),
* отличном от того, что сайт использует в данный момент. Говорят, что агент пользователя делает запрос с другого источника (cross-origin HTTP request),
* если источник текущего документа отличается от запрашиваемого ресурса доменом, протоколом или портом.
 */
app.use(cors())

// Import routes
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)




// Run server
const port = process.env.PORT || 8000
//callback in .listen() method is not required
app.listen(port, () => console.log(`Server is running on port ${port}`))