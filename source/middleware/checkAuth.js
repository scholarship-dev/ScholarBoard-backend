const jwt = require('jsonwebtoken');

// Constantly checks if the user is Autheticated
const checkAuth = (request, response, next) => {
  if (typeof request.cookies.scToken === 'undefined' || request.cookies.scToken === null) {
    request.user = null;
    console.log('user not authenticated');
  } else {
    const token = request.cookies.scToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    request.user = decodedToken.payload;
    console.log('user fully authenticated');
  }

  next();
};

module.exports = checkAuth;
