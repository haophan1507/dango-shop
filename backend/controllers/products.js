const { Category } = require('../models/category');
const { Product } = require('../models/product');
const { Comment } = require('../models/comment');
const expressAsyncHandler = require("express-async-handler");
const validateMongodbId = require('../helpers/validateMongodbID');

const fetchProductsCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      let filter = {};
      if (req?.query?.categories) filter = { category: req.query.categories.split(',') };

      const productList = await Product.find(filter).populate('category');

      if (!productList)
        return res.status(500).json({ success: false })

      return res.send(productList);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const fetchProductCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      validateMongodbId(id);
      const product = await Product.findById(id).populate('category');

      if (!product)
        return res.status(500).json({ success: false })

      return res.send(product);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const createProductCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const category = await Category.findById(req?.body?.category);
      if (!category) return res.status(400).send('Invalid category');

      const file = req?.file;
      if (!file) return res.status(400).send('No image in the request');
      const fileName = req?.file?.filename;
      const basePath = `${req?.protocol}://${req?.get('host')}/public/uploads/`;

      let product = new Product({
        name: req?.body?.name,
        description: req?.body?.description,
        richDescription: req?.body?.richDescription,
        image: `${basePath}${fileName}`,
        brand: req?.body?.brand,
        price: req?.body?.price,
        category: req?.body?.category,
        countInStock: req?.body?.countInStock,
        rating: req?.body?.rating,
        numReviews: req?.body?.numReviews,
        isFeatured: req?.body?.isFeatured,
      });

      product = await product.save();

      if (!product) return res.status(400).send('The product cannot created');

      return res.send(product);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const updateProductCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const category = await Category.findById(req?.body?.category);
      if (!category) return res.status(400).send('Invalid category');

      const { id } = req.params;
      validateMongodbId(id);
      const product = await Product.findById(id);
      if (!product) return res.status(400).send('Invalid Product!');

      const file = req.file;
      let imagepath;

      if (file) {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagepath = `${basePath}${fileName}`;
      } else {
        imagepath = product.image;
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req?.params?.id,
        {
          name: req?.body?.name,
          description: req?.body?.description,
          richDescription: req?.body?.richDescription,
          image: imagepath,
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

      if (!updatedProduct) return res.status(500).send('the product cannot be updated!');

      return res.send(updatedProduct);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const deleteProductCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      validateMongodbId(id);
      const product = await Product.findByIdAndRemove(id);
      if (product) {
        return res.status(200).json({ success: true, message: 'The product is deleted!' })
      } else {
        return res.status(404).json({ success: false, message: "product not found!" })
      }
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const fetchCountProductCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const productCount = await Product.countDocuments();

      if (!productCount) return res.status(500).json({ success: false })

      return res.send({
        productCount: productCount
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const fetchFeaturedProductCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const count = req.params.count ? req.params.count : 0;
      const products = await Product.find({ isFeatured: true }).limit(+count);

      if (!products) return res.status(500).json({ success: false })

      return res.send(products);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const updateImagesProductCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      validateMongodbId(id);

      const files = req.files;
      let imagesPaths = [];
      const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

      if (files) {
        files.map((file) => {
          imagesPaths.push(`${basePath}${file.filename}`);
        });
      }

      const product = await Product.findByIdAndUpdate(
        id,
        {
          images: imagesPaths
        },
        { new: true }
      );

      if (!product) return res.status(500).send('the gallery cannot be updated!');

      return res.send(product);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const fetchCommentsProductCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      validateMongodbId(id);

      const commentsList = await Comment.find({ product: id })
        .populate('user')
        .sort({ 'dateOrdered': -1 });


      if (!commentsList) return res.status(500).json({ success: false });

      return res.send(commentsList);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

module.exports = {
  fetchProductsCtrl,
  fetchProductCtrl,
  createProductCtrl,
  updateProductCtrl,
  deleteProductCtrl,
  fetchCountProductCtrl,
  fetchFeaturedProductCtrl,
  updateImagesProductCtrl,
  fetchCommentsProductCtrl
};