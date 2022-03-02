const express = require('express');
const router = express.Router();
const { authenticateJWT, authenticateAdminJWT } = require('../helpers/jwt');
const {
  fetchUsersCtrl,
  fetchUserCtrl,
  registerUserCtrl,
  updateUserCtrl,
  loginUserCtrl,
  deleteUserCtrl,
  fetchCountUserCtrl
} = require('../controllers/users');

router.get(`/`, authenticateAdminJWT, fetchUsersCtrl);

router.get(`/:id`, authenticateJWT, fetchUserCtrl);

router.post('/register', registerUserCtrl);

router.put(`/:id`, authenticateJWT, updateUserCtrl);

router.post('/login', loginUserCtrl);

router.delete('/:id', authenticateAdminJWT, deleteUserCtrl);

router.get(`/get/count`, authenticateAdminJWT, fetchCountUserCtrl);

module.exports = router;