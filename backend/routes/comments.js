const express = require('express');
const router = express.Router();
const {
  fetchCommentsCtrl,
  fetchCommentCtrl,
  updateCommentCtrl,
  createCommentCtrl,
  deleteCommentCtrl
} = require('../controllers/comments');

router.get(`/`, fetchCommentsCtrl);

router.get(`/:id`, fetchCommentCtrl);

router.put(`/:id`, updateCommentCtrl);

router.post('/', createCommentCtrl);

router.delete('/:id', deleteCommentCtrl);

module.exports = router;