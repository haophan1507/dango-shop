const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const secret = process.env.SECRET_KEY;
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Logging is error' });
      }

      req.user = user;

      next();
    });
  } else {
    res.status(401).json({ message: 'User is not logged in' });
  }
};

const authenticateAdminJWT = (req, res, next) => {
  const secret = process.env.SECRET_KEY;
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Logging is error' });
      }

      if (!user.isAdmin) {
        return res.status(401).json({ message: 'User is not admin' });
      }

      req.user = user;

      next();
    });
  } else {
    res.status(401).json({ message: 'User is not logged in' });
  }
};

module.exports = { authenticateJWT, authenticateAdminJWT };