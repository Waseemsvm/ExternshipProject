const router = require('express').Router()
const User = require('../models/User');
const Post = require('../models/Post');


router.post('/', async (req, res) => {

    //user to whom the post is to be shared
    const user = await User.findById({_id: req.body.shareTo }).catch(err => res.send({message: "user to share the post doesn't exist."}))
    const post = await Post.findById({_id: req.body.postId}).catch(err => res.send({message: "post not available"}))

    if(post.shares.indexOf(user._id.toString()) != -1)
        return res.send({message: "post shared already"})
    
    post.shares.push(user._id.toString())

    post.save(err => {
        if(err) res.send({message: "error sharing the post."})
    })



    res.send({message: "successfully shared the post."})
    

})

module.exports = router;