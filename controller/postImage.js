const router = require('express').Router();
const verify = require('../routes/verifyUser')
const User = require('../models/User')
const Post = require('../models/Post')


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

router.post('/', verify, upload.single('image'), async (req, res) => {
   const user  = await User.findOne({email: req.body.email});
   if(!user) res.send({message: "user not found"})
    

   const post = new Post({
       user: user._id,
       data: req.file.filename,
       postType: req.body.postType
   });

   await post.save(err => {
       if(err) res.status(500).send({message: "could not post"});
       res.send({message: "posted successfully"})
   })

})

module.exports= router;