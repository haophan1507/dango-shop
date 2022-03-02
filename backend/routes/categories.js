const express = require("express");
const router = express.Router();
const { authenticateAdminJWT } = require('../helpers/jwt');
const {
  fetchCategoriesCtrl,
  fetchCategoryCtrl,
  updateCategoryCtrl,
  createCategoryCtrl,
  deleteCategoryCtrl
} = require('../controllers/categories');

router.get(`/`, fetchCategoriesCtrl);

router.get(`/:id`, fetchCategoryCtrl);

router.put(`/:id`, authenticateAdminJWT, updateCategoryCtrl);

router.post('/', authenticateAdminJWT, createCategoryCtrl);

router.delete('/:id', authenticateAdminJWT, deleteCategoryCtrl);

module.exports = router;