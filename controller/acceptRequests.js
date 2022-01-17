const User = require('../models/User');
const router = require('express').Router();

router.post('/:userId', async(req, res) => {
    const userId = req.params.userId;
    const user1 = await User.findOne({email: req.body.email});
    const user2 = await User.findOne({_id: userId})
    
    if(user1.receivedRequestsFrom.includes(userId))
        return res.send({message: "already received the request"})


    user1.receivedRequestsFrom.splice(user1.receivedRequestsFrom.indexOf(userId), 1);
    user1.friendsList.push(user2._id);
    user2.sentRequestsTo.splice(user2.sentRequestsTo.indexOf(userId), 1)
    user2.friendsList.push(user1._id);

    user1.save(err => {
        if(err) return res.status(400).send("error updating userslist");
        console.log('updated friendsList of user 1');
    })

    user2.save(err => {
        if(err) return res.status(401).send("error updating userslist");
        console.log('updated friendsList of user 2')
    })
    
    res.send('You are now friends with '+ userId );
})


module.exports=router;