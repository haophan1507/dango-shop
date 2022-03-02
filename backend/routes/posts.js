const express = require('express');
const router = express.Router();
const { authenticateAdminJWT } = require('../helpers/jwt');
const uploadOptions = require('../helpers/uploadImage');
const {
  fetchPostsCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  createPostCtrl,
  deletePostCtrl
} = require('../controllers/posts');

router.get(`/`, fetchPostsCtrl);

router.get(`/:id`, fetchPostCtrl);

router.put(`/:id`, authenticateAdminJWT, uploadOptions.single('image'), updatePostCtrl);

router.post('/', authenticateAdminJWT, uploadOptions.single('image'), createPostCtrl);

router.delete('/:id', authenticateAdminJWT, deletePostCtrl);

module.exports = router;