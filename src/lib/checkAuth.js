const jwt = require('jsonwebtoken');

module.exports = function checkAuth(req, res, next) {
  console.log('Checking authentication');
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
    console.log('HIT NO USER');
    res.render('auth-error'); 
  } else {
    console.log(req.cookies);
    let token = req.cookies.nToken;
    let decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
    console.log(req.user); 
  }

  next();
};