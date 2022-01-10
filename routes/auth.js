const router = require('express').Router()
const { registerValidation, loginValidation } = require('../validation')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('../config/nodemailer.config')


router.post('/register', async (req, res)=>{

    // console.log(req.body)


    //VALIDATE registration
    const { error } = registerValidation(req.body)
    if(error) return res.send(error.details[0].message)

    //check if the user exists
    const emailExists = await User.findOne({email: req.body.email})
    if( emailExists ) return res.status(400).send('User already exists!')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length )];
    }

    console.log(token)
    //create a new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        confirmationCode: token
    })
            await user.save(err => {
                if(err)
                    return res.status(500).send({message: err})
                res.send({
                    message: "User was registered successfully ! Please check your email."
                })

                nodemailer.sendConfirmationEmail(
                    user.name,
                    user.email,
                    user.confirmationCode
                )
            })
        

})

router.post('/login', async (req, res) => {

    //login validation
    const { error } = loginValidation(req.body)
    if( error ) return res.send(error.details[0].message)

    //check if the user exists
    const user = await User.findOne({email: req.body.email})
    if( !user ) return res.status(400).send('Email not found')

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(401).send('Invalid Password')

    if(user.status != 'Active')
        return res.status(402).send({message: "Pending Account. Please verify your email"})

    //create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send("Login successful \n"+token)    

})



module.exports=router;