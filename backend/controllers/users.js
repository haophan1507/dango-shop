const { User } = require('../models/user');
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateMongodbId = require('../helpers/validateMongodbID');

const fetchUsersCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const userList = await User.find().select('-passwordHash');

      if (!userList) return res.status(500).json({ success: false })

      return res.send(userList);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const fetchUserCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      validateMongodbId(id);

      if (req?.user.userId !== id && !req?.user.isAdmin)
        return res.status(400).json({ message: 'The user cannot access' });

      const user = await User.findById(id).select('-passwordHash');

      if (!user) return res.status(500).json({ message: 'The user not found' });

      return res.send(user);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const registerUserCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      if (req?.body?.password.length < 6) return res.status(500).send('Password needs to be more than 6 characters');

      const userExist = await User.findOne({ email: req?.body?.email });
      if (userExist) return res.status(400).send('User already exists');

      let user = new User({
        name: req?.body?.name,
        email: req?.body?.email,
        passwordHash: await bcrypt.hashSync(req?.body?.password, 10),
        phone: req?.body?.phone,
        isAdmin: req?.body?.isAdmin,
        street: req?.body?.street,
        apartment: req?.body?.apartment,
        zip: req?.body?.zip,
        city: req?.body?.city,
        country: req?.body?.country,
      });

      user = await user.save();

      if (!user) return res.status(500).send('The user cannot be created');

      return res.send(user);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const updateUserCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      validateMongodbId(id);

      if (req?.user.userId !== id && !req?.user.isAdmin)
        return res.status(400).json({ message: 'The user cannot update' });

      const userExist = await User.findById(id);
      if (!userExist)
        return res.status(400).json({ message: 'Invalid user' });

      let newPassword;
      if (req?.body?.newPassword === req?.body?.confirmPassword && !!req?.body?.newPassword) {
        //case change password
        //compare old password and change
        const comparePassword = bcrypt.compareSync(req?.body?.password, userExist.passwordHash);
        if (comparePassword) {
          newPassword = bcrypt.hashSync(req?.body?.newPassword, 10);
        } else {
          return res.status(400).json({ message: 'Password wrong' });
        }
      } else {
        //case update user
        if (req?.body?.password) {
          newPassword = bcrypt.hashSync(req?.body?.password, 10);
        } else {
          newPassword = userExist.passwordHash;
        }
      }

      const user = await User.findByIdAndUpdate(
        req?.params?.id,
        {
          name: req?.body?.name,
          passwordHash: newPassword,
          phone: req?.body?.phone,
          isAdmin: req?.body?.isAdmin,
          street: req?.body?.street,
          apartment: req?.body?.apartment,
          zip: req?.body?.zip,
          city: req?.body?.city,
          country: req?.body?.country,
        },
        { new: true },
      );

      if (!user)
        return res.status(400).json({ message: 'The user cannot update' });

      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const loginUserCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const user = await User.findOne({ email: req?.body?.email });

      if (!user) return res.status(400).send('The user not found');

      if (user && bcrypt.compareSync(req?.body?.password, user.passwordHash)) {
        const token = jwt.sign(
          { userId: user.id, isAdmin: user.isAdmin, },
          process.env.SECRET_KEY,
          { expiresIn: '1w' },
        );

        return res.status(200).send({ user: user.email, token });
      } else {
        return res.status(400).send('password is wrong');
      };
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const deleteUserCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      validateMongodbId(id);
      const user = await User.findByIdAndRemove(id);
      if (user) {
        return res.status(200).json({ success: true, message: 'the user is deleted!' });
      } else {
        return res.status(404).json({ success: false, message: "user not found!" });
      }
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

const fetchCountUserCtrl = expressAsyncHandler(
  async (req, res) => {
    try {
      const userCount = await User.countDocuments();

      if (!userCount) return res.status(500).json({ success: false });

      return res.send({ userCount });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    };
  }
);

module.exports = {
  fetchUsersCtrl,
  fetchUserCtrl,
  registerUserCtrl,
  updateUserCtrl,
  loginUserCtrl,
  deleteUserCtrl,
  fetchCountUserCtrl
};