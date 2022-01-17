const router = require('express').Router();
const { user } = require('../configs/auth.config');
const User = require('../models/User')

router.post('/', async (req, res) => {
    const userId = req.body.id;
    const user1 = await User.findOne({email: req.body.email})
    const blockList = user1.blockList.toString();
    const user2unblock = blockList.indexOf(userId);

    if(!user1.blockList.includes(userId))
        return res.send({message: "user not in blockList"})

    user1.blockList.splice(user2unblock, 1);
    user1.friendsList.push(userId);

    user1.save(err => {
        if(err) res.send({message: "unblocking user unsuccessful"})
        res.send({message: "user unblocked successfully"})
    })
    
})


module.exports=router;

