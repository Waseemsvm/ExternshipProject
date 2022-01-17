const router = require('express').Router();
const User = require('../models/User')

router.post('/', async (req, res) => {
    const userId = req.body.id;
    const user1 = await User.findOne({email: req.body.email})
    const friendsList = user1.friendsList.toString();
    const user2block = friendsList.indexOf(userId);
    
    if(user1.blockList.includes(userId))
    return res.send({message: "user already in blocklist"})
    user1.friendsList.splice(user2block, 1);
    
    user1.blockList.push(userId);

    user1.save(err => {
        if(err) res.send({message: "blocking user unsuccessful"})
        res.send({message: "user blocked successfully"})
    })
    
})


module.exports=router;

