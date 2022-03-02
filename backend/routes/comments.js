const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../helpers/jwt');
const {
  fetchCommentsCtrl,
  fetchCommentCtrl,
  updateCommentCtrl,
  createCommentCtrl,
  deleteCommentCtrl
} = require('../controllers/comments');

router.get(`/`, fetchCommentsCtrl);

router.get(`/:id`, fetchCommentCtrl);

router.put(`/:id`, authenticateJWT, updateCommentCtrl);

router.post('/', authenticateJWT, createCommentCtrl);

router.delete('/:id', authenticateJWT, deleteCommentCtrl);

module.exports = router;