const jwt = require('jsonwebtoken');

// Constantly checks if the user is Autheticated
const checkAuth = (request, response, next) => {
  
  if (typeof request.cookies.scToken === 'undefined' || request.cookies.scToken === null) {
    request.user = null;
  } else {
    // Decode the token and send the current user object in the req body
    const token = request.cookies.scToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    request.user = decodedToken.payload;
  }

  next();
};

module.exports = checkAuth;
