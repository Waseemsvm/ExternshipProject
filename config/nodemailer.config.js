const nodemailer = require('nodemailer')
const config = require('../configs/auth.config')


//get the sender's user email and password
const user = config.user;
const pass = config.pass



// 
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
         user: user,
         pass: pass
    }
});


module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    console.log('Check')
    transport.sendMail({
        from: user,
        to: email,
        subject: "Please confirm your account",
        html: `<html><h1> Email confirmation </h1>
                <h2> Hello ${name} </h2>
                <p> Please confirm your email by clicking the following link</p>
                    <a href="http://localhost:3000/confirm/${confirmationCode}"> Click Here </a>
                </html>`
    }).catch(err => console.log(err))
}