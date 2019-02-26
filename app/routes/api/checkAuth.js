

// Constantly checks if the user is Autheticated
var checkAuth = (request, response, next) => {
  
  if (typeof request.cookies.scToken === "undefined" || request.cookies.scToken === null) {
    request.user = null;
  } else {
    var token = request.cookies.scToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    request.user = decodedToken.payload;
  }

  next();
};

module.exports = checkAuth
