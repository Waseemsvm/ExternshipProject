const User = require('../models/User')
const router = require('express').Router();


//get the confirmation code 
router.get('/:confirmationCode', (req, res) => {

    // console.log(req.params.confirmationCode)


    //get the user with the matching confirmation code 
    User.findOne({
        confirmationCode: req.params.confirmationCode
    }).then(user => {
        

        //if user with the above confirmation code is not available then send user not found message
        if(!user) return res.status(404).send({ message: "User not found !"})
        if(user.status != "Active")
            user.status = "Active";

        console.log(user)


        //other wise save the user to the mongodb database.
        user.save(err => {

            //if could not udate the database then return errror
            if(err){
                res.status(500).send({message: err})
                return;
            }  
        })

        res.send(user)


    }).catch( err => console.log(err))
})


// const verifyUser = ( req, res, next ) => {
    // User.findOne({
    //     confirmationCode: req.params.confirmationCode
    // }).then(user => {
    //     if(!user) return res.status(404).send({ message: "User not found !"})

    //     user.status = "Active";
    //     user.save(err => {
    //         if(err){
    //             res.status(500).send({message: err})
    //             return;
    //         }  
    //     })

    //     next();

    // }).catch( err => console.log(err))
// }

module.exports = router