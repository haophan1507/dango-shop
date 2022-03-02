const express = require('express');
const router = express.Router();
const { authenticateAdminJWT } = require('../helpers/jwt');
const uploadOptions = require('../helpers/uploadImage');
const {
  fetchProductsCtrl,
  fetchProductCtrl,
  createProductCtrl,
  updateProductCtrl,
  deleteProductCtrl,
  fetchCountProductCtrl,
  fetchFeaturedProductCtrl,
  updateImagesProductCtrl
} = require('../controllers/products');

router.get(`/`, fetchProductsCtrl);

router.get(`/:id`, fetchProductCtrl);

router.post(`/`, authenticateAdminJWT, uploadOptions.single('image'), createProductCtrl);

router.put(`/:id`, authenticateAdminJWT, uploadOptions.single('image'), updateProductCtrl);

router.delete('/:id', authenticateAdminJWT, deleteProductCtrl);

router.get(`/get/count`, fetchCountProductCtrl);

router.get(`/get/featured/:count`, fetchFeaturedProductCtrl);

router.put('/gallery-images/:id', authenticateAdminJWT, uploadOptions.array('images', 10), updateImagesProductCtrl);

module.exports = router;