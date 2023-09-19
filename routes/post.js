const path = require('path');

const express = require('express');

const postController = require('../controllers/post');

const router = express.Router();

router.post('/user/add-post',postController.createPost);
router.get('/user/get-posts',postController.getPosts);
router.post('/user/add-comment',postController.addComment);
router.get('/user/get-comments/:postId',postController.getComments);

module.exports=router;