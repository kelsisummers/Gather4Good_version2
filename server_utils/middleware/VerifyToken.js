var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var express = require("express");
var router = express.Router();

//Middleware function to attach to protected API routes
function verifyToken(req, res, next) {

  console.log("verify token called");
  var token = req.headers['x-access-token'];
  var secret_key = process.env.SECRET_KEY;

  if (token === "null") {
    token = null;
  }

  if (!token) {
    return res.status(401).json({auth: false, message: 'No token provided.'});
  }

  // If token exists, verify its claims
  jwt.verify(token, secret_key, function(err, decoded) {
    if (err) {
      if(err.message == "jwt expired") {
        return res.status(498).json({auth: false, id: null, message: 'Token expired'});
      } else {
        return res.status(500).json({auth: false, id: null, message: 'Server Error: Failed to authenticate token.'});
      }
    } else {
      req.userID = decoded._id;
      req.token = token;
      next();
    }
  });
};

module.exports = verifyToken;
