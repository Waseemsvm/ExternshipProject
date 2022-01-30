const express = require('express')
const app = express();
const mongoose = require('mongoose')

//configure
require('dotenv/config')
app.use(express.json())

//connect to db
mongoose.connect(process.env.DB_CONNECT,
    () => {console.log('Connected to the Database')}
)


//imports
const ping = require('./routes/ping')
const authRoute = require('./routes/auth')
const verifyUser = require('./routes/verifyUser')
const uploadPostImage = require('./controller/uploadPostImage')
const uploadProfileImage = require('./controller/updateProfileImage')
const sendRequests = require('./controller/sendRequests')
const acceptRequests = require('./controller/acceptRequests')
const blockUser = require('./controller/blockUsers')
const unblockUser = require('./controller/unblockUser')
const removeFriend = require('./controller/removeFriend')
const rejectRequest = require('./controller/rejectFriendRequests')
const getUsers = require('./controller/getAllFriends')
const postRoute = require('./routes/post')

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

//route to upload the post images
app.use('/uploadPostImage', uploadPostImage)


//route to upload the profile images
app.use('./uploadProfileImage', uploadProfileImage)

app.use('/sendRequests', sendRequests)

//route to accept the friend requests
app.use('/acceptRequest', acceptRequests)

//route to reject the friend request
app.use('/rejectRequest', rejectRequest)

//route to block user
app.use('/blockUser', blockUser)

//route to unblock user
app.use('/unblockUser', unblockUser)

//route to remove user
app.use('/removeFriend', removeFriend)

app.use('/getUsers', getUsers)

app.use('/post', postRoute)

//listen to the server
app.listen(process.env.PORT, () => {
    console.log(`Server is up and running at port : ${process.env.PORT}`)
})

