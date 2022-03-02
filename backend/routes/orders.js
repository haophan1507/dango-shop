const express = require('express');
const router = express.Router();
const { authenticateJWT, authenticateAdminJWT } = require('../helpers/jwt');
const {
  fetchOrdersCtrl,
  fetchOrderCtrl,
  createOrderCtrl,
  updateOrderCtrl,
  deleteOrderCtrl,
  fetchTotalSalesCtrl,
  fetchCountOrderCtrl,
  fetchUserOrderCtrl,
  createCheckoutCtrl
} = require('../controllers/orders');

router.get(`/`, fetchOrdersCtrl);

router.get(`/:id`, fetchOrderCtrl);

router.post('/', authenticateJWT, createOrderCtrl);

router.post('/create-checkout-session', authenticateJWT, createCheckoutCtrl);

router.put('/:id', authenticateAdminJWT, updateOrderCtrl);

router.delete('/:id', authenticateAdminJWT, deleteOrderCtrl);

router.get('/get/totalsales', fetchTotalSalesCtrl);

router.get(`/get/count`, fetchCountOrderCtrl);

router.get(`/get/userorders/:userid`, authenticateJWT, fetchUserOrderCtrl);

module.exports = router;