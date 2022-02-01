const router = require('express').Router();
const User = require('../models/User')

router.post('/makePublic', async (req, res) => {

    const user = await User.findOne({email: req.body.email})
    if(!user) return res.send({message: "user could not be found"})

    if(user.visibility == 'public') return res.send({message: "profile already made public."})

    user.visibility = 'public';

    user.save(err => {
        if(err) res.send({message: "error making user profile public"})
    })

    res.send({message: "made profile public"})

})


router.post('/makePrivate', async(req, res) => {
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.send({message: "user could not be found"})

    if(user.visibility == 'private') return res.send({message: "profile already made private."})

    user.visibility = 'private';

    user.save(err => {
        if(err) res.send({message: "error making user profile private"})
    })

    res.send({message: "made profile private"})

})

module.exports = router;