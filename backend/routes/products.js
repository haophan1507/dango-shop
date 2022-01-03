const { Product } = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const mongoose = require('mongoose');
const router = express.Router();

router.get(`/`, async (req, res) => {

  let filter = {};
  if (req?.query?.categories) filter = { category: req.query.categories.split(',') };

  const productList = await Product.find(filter).populate('category');

  if (!productList)
    res.status(500).json({ success: false })

  res.send(productList);
});

router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req?.params?.id).populate('category');

  if (!product)
    res.status(500).json({ success: false })

  res.send(product);
});

router.post(`/`, async (req, res) => {
  const category = await Category.findById(req?.body?.category);
  if (!category) res.status(400).send('Invalid category');

  let product = new Product({
    name: req?.body?.name,
    description: req?.body?.description,
    richDescription: req?.body?.richDescription,
    image: req?.body?.image,
    brand: req?.body?.brand,
    price: req?.body?.price,
    category: req?.body?.category,
    countInStock: req?.body?.countInStock,
    rating: req?.body?.rating,
    numReviews: req?.body?.numReviews,
    isFeatured: req?.body?.isFeatured,
  });

  product = await product.save();

  if (!product) res.status(500).send('The product cannot created');

  res.send(product);
});

router.put(`/:id`, async (req, res) => {
  if (!mongoose.isValidObjectId(req?.params?.id)) res.status(400).send('Invalid category id')

  const category = await Category.findById(req?.body?.category);
  if (!category) res.status(400).send('Invalid category');

  const product = await Product.findByIdAndUpdate(
    req?.params?.id,
    {
      name: req?.body?.name,
      description: req?.body?.description,
      richDescription: req?.body?.richDescription,
      image: req?.body?.image,
      brand: req?.body?.brand,
      price: req?.body?.price,
      category: req?.body?.category,
      countInStock: req?.body?.countInStock,
      rating: req?.body?.rating,
      numReviews: req?.body?.numReviews,
      isFeatured: req?.body?.isFeatured,
    },
    { new: true },
  );

  if (!product)
    res.status(500).json({ message: 'The product cannot update' });

  res.status(200).send(product);
});

router.delete('/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id).then(category => {
    if (category) {
      res.status(200).json({ success: true, message: 'The category is deleted!' })
    } else {
      res.status(404).json({ success: false, message: "Category not found!" })
    }
  }).catch(err => {
    res.status(500).json({ success: false, error: err })
  })
});

router.get(`/get/count`, async (req, res) => {

  const productCount = await Product.countDocuments();

  if (!productCount) res.status(500).json({ success: false })

  res.send({
    count: productCount
  });
});

router.get(`/get/featured/:count`, async (req, res) => {
  const count = req?.param?.count ? req.params.count : 0;
  const products = await Product.find({ isFeatured: true }).limit(+count);

  if (!products) res.status(500).json({ success: false })

  res.send(products);
});

module.exports = router;