const express = require('express');
const router = express.Router();
const {
  fetchUsersCtrl,
  fetchUserCtrl,
  registerUserCtrl,
  updateUserCtrl,
  loginUserCtrl,
  deleteUserCtrl,
  fetchCountUserCtrl
} = require('../controllers/users');

router.get(`/`, fetchUsersCtrl);

router.get(`/:id`, fetchUserCtrl);

router.post('/', registerUserCtrl);

router.put(`/:id`, updateUserCtrl);

router.post('/login', loginUserCtrl);

router.delete('/:id', deleteUserCtrl);

router.get(`/get/count`, fetchCountUserCtrl);

module.exports = router;