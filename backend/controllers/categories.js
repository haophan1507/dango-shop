const { Category } = require('../models/category');
const expressAsyncHandler = require("express-async-handler");
const validateMongodbId = require('../helpers/validateMongodbID');

const fetchCategoriesCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const categoryList = await Category.find();

      if (!categoryList)
        return res.status(500).json({ success: false });

      return res.status(200).send(categoryList);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const fetchCategoryCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      validateMongodbId(id);
      const category = await Category.findById(id);

      if (!category)
        return res.status(500).json({ message: 'The category ID not found' });

      return res.status(200).send(category);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const updateCategoryCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      if (!req.body?.name.trim() || !req.body?.icon.trim())
        return res.status(500).json({ message: 'Name or icon empty' });

      const { id } = req.params;
      validateMongodbId(id);
      const category = await Category.findByIdAndUpdate(
        id,
        {
          name: req.body?.name,
          icon: req.body?.icon,
          color: req.body?.color,
        },
        { new: true },
      );

      if (!category)
        return res.status(400).json({ message: 'The category cannot update' });

      return res.status(200).send(category);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const createCategoryCtrl = expressAsyncHandler(
  async (req, res) => {
    const categoryExist = await Category.findOne({ name: req.body?.name });
    if (categoryExist) return res.status(500).send('Category already exists');

    try {
      let category = new Category({
        name: req.body?.name,
        icon: req.body?.icon,
        color: req.body?.color,
      });

      category = await category.save();

      if (!category) return res.status(400).send('The category cannot be created');

      return res.send(category);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const deleteCategoryCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      validateMongodbId(id);
      const category = await Category.findByIdAndRemove(id);
      if (category) {
        return res.status(200).json({ success: true, message: 'The category is deleted!' });
      } else {
        return res.status(404).json({ success: false, message: "Category not found!" });
      }
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

module.exports = {
  fetchCategoriesCtrl,
  fetchCategoryCtrl,
  updateCategoryCtrl,
  createCategoryCtrl,
  deleteCategoryCtrl
};