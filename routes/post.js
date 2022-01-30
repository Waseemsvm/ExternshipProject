const router = require('express').Router();
const uploadPostImage = require('../controller/uploadPostImage');
const postText = require('../controller/postText')
const commentPost = require('../controller/commentPost')
const likePost = require('../controller/likePost')
const dislikePost = require('../controller/dislikePost')
const sharePost = require('../controller/sharePost')
const removePost = require('../controller/removePost')


router.use('/postText', postText)
router.use('/commentPost', commentPost)
router.use('/likePost', likePost)
router.use('/dislikePost', dislikePost)
router.use('/sharePost', sharePost)
router.use('/removePost', removePost)

module.exports = router;