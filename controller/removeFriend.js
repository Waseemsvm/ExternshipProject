const User = require('../models/User');
const router = require('express').Router();

router.post('/', async(req, res) => {
    const user1 = await User.findOne({email: req.body.email});
    const user2 = await User.findOne({_id: req.body.id})
    const user1_id = user1._id.toString();
    const user2_id = user2._id.toString();
    const friendsList1 = user1.friendsList.toString();
    const friendsList2 = user2.friendsList.toString();
    if(!user1.friendsList.includes(user2_id))
        return res.send({message: "user not in freindsList"})

    user1.friendsList.splice( friendsList1.indexOf(user2_id) , 1);
    user2.friendsList.splice(  friendsList2.indexOf(user1_id) , 1);

    user1.save(err => {
        if(err) return res.status(400).send("error removing user2");
        console.log('updated friendsList of user 1');
    })

    user2.save(err => {
        if(err) return res.status(401).send("error removing user1");
        console.log('updated friendsList of user 2')
    })
    
    res.send('You are no more friends with '+ user2_id);
})


module.exports=router;