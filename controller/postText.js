const router = require('express').Router();
const verify = require('../routes/verifyUser')
const User = require('../models/User')
const Post = require('../models/Post')

router.post('/', verify, async (req, res) => {
   const user  = await User.findOne({email: req.body.email});
   if(!user) res.send({message: "user not found"})
   const post = new Post({
       user: user._id,
       data: req.body.postBody
   });

   await post.save(err => {
       if(err) res.status(500).send({message: "could not post"});
       res.send({message: "posted successfully"})
   })

})

module.exports= router;