const express = require('express');
const router = express.Router();
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

router.post('/', createOrderCtrl);

router.post('/create-checkout-session', createCheckoutCtrl);

router.put('/:id', updateOrderCtrl);

router.delete('/:id', deleteOrderCtrl);

router.get('/get/totalsales', fetchTotalSalesCtrl);

router.get(`/get/count`, fetchCountOrderCtrl);

router.get(`/get/userorders/:userid`, fetchUserOrderCtrl);

module.exports = router;