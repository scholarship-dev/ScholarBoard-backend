const jwt = require('jsonwebtoken');

module.exports = function checkUser(req, res, next) {
  console.log('Checking user');
  console.log(req.cookies);
  const token = req.cookies.nToken;
  const decodedToken = jwt.decode(token, { complete: true }) || {};
  req.user = decodedToken.payload;
  console.log(req.user); 

  next();
};
