const router = require('express').Router();
const Post = require('../models/Post')
const User = require('../models/User')
router.post('/', async(req, res) => {
    const user = await User.findOne({email: req.body.email})
    if(!user) res.send({message: "user not found"})

    const post = await Post.findOne({_id: req.body.postId})
    if(!post) res.send({message: "post not found"})


    post.comments.push({user: user._id.toString() ,comment: req.body.comment})
    post.save(err => {
        if(err) res.send({message: "could not comment"})
    })
    res.send({message: "comment successful"})
})

module.exports = router;