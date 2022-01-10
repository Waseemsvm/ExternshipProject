const express = require('express')
const app = express();
const mongoose = require('mongoose')

//configure
require('dotenv/config')
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

//connect to db
mongoose.connect(process.env.DB_CONNECT,
    () => {console.log('Connected to the Database')}
)


//imports
const ping = require('./routes/ping')
const authRoute = require('./routes/auth')
const verifyUser = require('./routes/verifyUser')

//GET /
app.get('/', (req, res) => {
    console.log('This is the home page');
    res.send('This is the home page')
})

//GET /ping

app.use('/ping', ping);


//POST /users/signup

app.use('/users', authRoute);


//confirmation route
app.use('/confirm', verifyUser)


app.listen(process.env.PORT, () => {
    console.log(`Server is up and running at port : ${process.env.PORT}`)
})

