const express = require('express');
const router = express.Router();
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

router.post(`/`, uploadOptions.single('image'), createProductCtrl);

router.put(`/:id`, uploadOptions.single('image'), updateProductCtrl);

router.delete('/:id', deleteProductCtrl);

router.get(`/get/count`, fetchCountProductCtrl);

router.get(`/get/featured/:count`, fetchFeaturedProductCtrl);

router.put('/gallery-images/:id', uploadOptions.array('images', 10), updateImagesProductCtrl);

module.exports = router;