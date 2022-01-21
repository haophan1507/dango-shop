const express = require("express");
const router = express.Router();
const {
  fetchCategoriesCtrl,
  fetchCategoryCtrl,
  updateCategoryCtrl,
  createCategoryCtrl,
  deleteCategoryCtrl
} = require('../controllers/categories');

router.get(`/`, fetchCategoriesCtrl);

router.get(`/:id`, fetchCategoryCtrl);

router.put(`/:id`, updateCategoryCtrl);

router.post('/', createCategoryCtrl);

router.delete('/:id', deleteCategoryCtrl);

module.exports = router;