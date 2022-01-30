const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')


router.post('/', async (req, res) => {

    //fetch the user and the required post object
    const user = await User.findOne({email: req.body.email})
    const post = await Post.findOne({_id: req.body.postId})
    const userid = user._id.toString();

    //check if the user or the post exists
    if( !user) return res.send({message: "user not found"});
    if( !post) return res.send({messgae: "post not found"})


    //define the posts and likes array and set as necessary
    let likes ;
    let dislikes;

    if(post.likes == undefined)
        likes = []
    else {
        likes = post.likes;
    }

    if(post.dislikes == undefined)
        dislikes = []
    else {
        dislikes = post.dislikes;
    }


    //check if the user who dislikes likes the post exists in dislikes array and remove him and put into likes array
    if(likes.indexOf(userid) != -1)
        likes.splice(dislikes.indexOf(userid), 1)
    if(dislikes.indexOf(userid) == -1)
        dislikes.push(userid)

    post.dislikes = dislikes;
    post.likes = likes;

    post.save(err => {
        if(err) res.status(500).send({message: "could not submit like request"})
    })

    console.log("likes :"+likes)
    console.log("dislikes :"+dislikes)
    
    
    

    return res.send({message: "disliked the post"})
})

module.exports = router;