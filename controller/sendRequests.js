const User = require('../models/User');
const router = require('express').Router();

router.post('/:userId', async(req, res) => {

    //get the user with requesters mail
    console.log(req.body.email)
    const user1 = await User.findOne({email: req.body.email});
    if(!user1) return res.status(400).send({message: "User1 not found!"});

    const user2 = await User.findOne({_id: req.params.userId});
    if(!user2) return res.status(400).send({message: "User2 not found!"});
    
    //update the sentRequestsTo array of the users object
    if(!user1.sentRequestsTo.includes(user2._id.toString()))
        user1.sentRequestsTo.push(user2._id.toString());
    else return res.send({message: "request already sent"})
    //update the receiveRequestsFrom array of the userobject 
        user2.receivedRequestsFrom.push(user1._id.toString());

    user1.save(err => {
        if(err) return res.status(401).send("Request Not sent");
        console.log('request sent successfully')
    })
    
    user2.save(err => {
        if(err) return res.status(402).send("Request not sent");
        console.log('request received successfully')
    })

    res.send({message: "request sent successfully"})
})


module.exports=router;

