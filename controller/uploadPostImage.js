const express = require('express');
const router = express.Router();
const User = require('../models/User')
const verify = require('../routes/verifyToken')
const Post = require('../models/Post')

// const app = express();

const multer = require('multer');
//file storage handler
const storage = multer.diskStorage({

    //destination for files
    destination: function(request, file, callback){
        callback(null, 'public/uploads/postimages')
    },

    ///add back the extension
    filename: function(request, file, callback){
        callback(null, Date.now() +  file.originalname)
    },
})

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3
    },
})


router.post('/', verify ,upload.single('image'), async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    
    //update the profileImagepath
    user.posts.push(req.file.filename)

    

    //save the user to the database
    // console.log(req.file.filename)

    await user.save(err => {
        if(err) return res.status(400).send({message: err})
        res.send({message: "successfully posted the image on profile"})
    })
    
} )


module.exports= router;
