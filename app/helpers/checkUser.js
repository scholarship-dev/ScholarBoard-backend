const jwt = require('jsonwebtoken');

module.exports = function checkUser(req, res, next) {
  console.log('Checking user');
  console.log(req.cookies);
  let token = req.cookies.nToken;
  let decodedToken = jwt.decode(token, { complete: true }) || {};
  req.user = decodedToken.payload;
  console.log(req.user); 

  next();
};
