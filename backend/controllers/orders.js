const { Order } = require('../models/order');
const { OrderItem } = require('../models/orderItem');
const { Product } = require('../models/product');
const stripe = require('stripe')('sk_test_51KOgxzFqZk9ebbKnJ9Hlj93yWjDkssjYKDInXvAtowGDvkEwqNDHOYbgsKdjXKH2ER6M8M35AMzowewbScSRjzrp00WSxAzKmG');
const expressAsyncHandler = require("express-async-handler");
const validateMongodbId = require('../helpers/validateMongodbID');

const fetchOrdersCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const orderList = await Order.find()
        .populate('user', 'name')
        .populate('orderItems')
        .sort({ 'dateOrdered': -1 });

      if (!orderList) return res.status(500).json({ success: false });

      return res.send(orderList);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const fetchOrderCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      validateMongodbId(id);
      const order = await Order.findById(id)
        .populate('user', 'name')
        .populate({
          path: 'orderItems', populate: {
            path: 'product', populate: { path: 'category' }
          }
        });

      if (!order) return res.status(500).json({ success: false });

      return res.send(order);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const createOrderCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) => {
        if (orderItem.quantity <= 0)
          return res.status(500).json({ success: false, message: "Quantity needs to be greater than 0" })

        let newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
      }))
      const orderItemsIdsResolved = await orderItemsIds;

      const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
      }))

      const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

      let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req?.body?.shippingAddress1,
        shippingAddress2: req?.body?.shippingAddress2,
        city: req?.body?.city,
        zip: req?.body?.zip,
        country: req?.body?.country,
        phone: req?.body?.phone,
        status: req?.body?.status,
        payment: req?.body?.payment,
        totalPrice: totalPrice,
        user: req?.body?.user,
      });

      order = await order.save();

      if (!order) return res.status(400).send('The order cannot be created');

      return res.send(order);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const createCheckoutCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const orderItems = req.body;
      if (!orderItems) return res.status(400).send('checkout session cannot be created');
      const lineItems = await Promise.all(
        orderItems.map(async orderItem => {
          const product = await Product.findById(orderItem.product);
          return {
            price_data: {
              currency: 'vnd',
              product_data: {
                name: product.name
              },
              unit_amount: product.price,
            },
            quantity: orderItem.quantity,
          }
        })
      );
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:4200/success',
        cancel_url: 'http://localhost:4200/error',
      });
      res.json({ id: session.id })
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const updateOrderCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      validateMongodbId(id);

      const orderFind = await Order.findById(id).populate('orderItems');

      switch (orderFind.status) {
        case 0:
          //check status
          if (+req?.body?.status === 0 || +req?.body?.status === 4) break;
          //check products in stock
          const productList = Promise.all(orderFind.orderItems.map(async item => {
            const product = await Product.findById(item.product)
            if (product.countInStock >= item.quantity) {
              return product
            }
          }))
          if ((await productList).includes(undefined)) {
            return res.status(500).send('Product is temporarily out of stock!');
          }
          // update products
          const productUpdate = Promise.all(orderFind.orderItems.map(async item => {
            const product = await Product.findById(item.product)
            await Product.findByIdAndUpdate(
              product.id,
              {
                countInStock: product.countInStock - item.quantity
              },
              { new: true }
            )
          }))
          await productUpdate;
          break;
        case 1:
        case 2:
        case 3:
          //check status
          if (+req?.body?.status === 0 || +req?.body?.status === 4) {
            const productUpdate = Promise.all(orderFind.orderItems.map(async item => {
              const product = await Product.findById(item.product)
              await Product.findByIdAndUpdate(
                product.id,
                {
                  countInStock: product.countInStock + item.quantity
                },
                { new: true }
              )
            }))
            await productUpdate;
          };
          break;
        default:
          break;
      }

      const order = await Order.findByIdAndUpdate(
        id,
        {
          status: req?.body?.status
        },
        { new: true }
      )

      if (!order) return res.status(400).send('the order cannot be update!')

      return res.send(order);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const deleteOrderCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      validateMongodbId(id);
      const order = await Order.findByIdAndRemove(id);
      if (order) {
        return res.status(200).json({ success: true, message: 'the order is deleted!' });
      } else {
        return res.status(404).json({ success: false, message: "order not found!" });
      }
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const fetchTotalSalesCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const totalSales = await Order.aggregate([
        { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } }
      ]);

      if (!totalSales) return res.status(400).send('The order sales cannot be generated');

      return res.send({ totalsales: totalSales.pop().totalsales });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const fetchCountOrderCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const orderCount = await Order.countDocuments();

      if (!orderCount) return res.status(500).json({ success: false })

      return res.send({
        orderCount: orderCount
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const fetchUserOrderCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const { userid } = req.params;
      validateMongodbId(userid);
      const userOrderList = await Order.find({ user: userid })
        .populate({
          path: 'orderItems', populate: {
            path: 'product', populate: { path: 'category' }
          }
        })
        .sort({ 'dateOrdered': -1 });

      if (!userOrderList) return res.status(500).json({ success: false });

      return res.send(userOrderList);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const fetchOrdersExceptFailedCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const orderList = await Order.find({ "status": { $nin: ["0", "4"] } })
        .populate('user', 'name')
        .populate('orderItems')
        .sort({ 'dateOrdered': -1 });

      if (!orderList) return res.status(500).json({ success: false });

      return res.send(orderList);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

module.exports = {
  fetchOrdersCtrl,
  fetchOrderCtrl,
  createOrderCtrl,
  updateOrderCtrl,
  deleteOrderCtrl,
  fetchTotalSalesCtrl,
  fetchCountOrderCtrl,
  fetchUserOrderCtrl,
  createCheckoutCtrl,
  fetchOrdersExceptFailedCtrl
};