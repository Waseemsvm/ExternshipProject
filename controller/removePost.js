const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')

router.post('/', async (req, res) => {

    const user = await User.findOne({email: req.body.email})
   const post = await Post.findOneAndDelete({user: user._id.toString(), _id: req.body.postId}).catch(err => {
       res.send({message: "could not find the post to delete"})
   }) ;
   if(post == null)
        return res.send({message: `You are not authorized to remoe the post ${req.body.postId}`})
   res.send("removed post \n "+post)
})

module.exports = router;