const router = require('express').Router();
const User = require('../models/User')

router.post('/', async (req, res)=>{
    friend_id = req.body.id;
    const user1 = await User.findOne({email: req.body.email})
    const user2 = await User.findOne({_id: friend_id})

    console.log(user2)
    requestsList1 = user1.receivedRequestsFrom.toString();
    requestsList2 = user2.sentRequestsTo.toString();
    if(!user1.receivedRequestsFrom.includes(friend_id))
        return res.send({message: 'no requests available with id' + friend_id})


    user1.receivedRequestsFrom.splice(requestsList1.indexOf(friend_id), 1);
    user2.sentRequestsTo.splice(requestsList2.indexOf(user1._id.toString()), 1)

    user1.save(err => {
        if(err) return res.send({message: "user1 not updated"})
    })
    user2.save(err => {
        if(err) return res.send({message: "user2 not updated"})
    })

    
    res.send({message: "Request rejected successfully"})


})


module.exports= router;