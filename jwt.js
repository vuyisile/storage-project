var jwt = require("jsonwebtoken");
require('dotenv').config();

function generateToken(userDetails) {
  return token = jwt.sign(userDetails, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 2 //expires in 2 hours
  });
}

function verifyJWTToken(token) {
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err || !decodedToken) {
      return err || 'token not valid'
    }
    return decodedToken
  })
}

function verifyJWT_MW(req, res, next) {
  let token = req.headers.auth
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err){
      return res.status(302).send({ auth: false, message: 'token authentication failed' });
    }
    req.userActive = decoded;
    next()
})
}

module.exports = {
  generateToken,
  verifyJWTToken,
  verifyJWT_MW
}