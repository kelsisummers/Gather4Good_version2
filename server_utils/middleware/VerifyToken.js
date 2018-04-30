var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var express = require("express");
var router = express.Router();
//var secret_key = process.env.SECRET_KEY;

//Middleware function to attach to protected API routes
function verifyToken(req, res, next) {

  console.log("verify token called");
  var token = req.headers['x-access-token'];
  var secret_key = process.env.SECRET_KEY;

  console.log("Secret Key:" + secret_key);

  console.log(token);
  if (token === "null") {
    token = null;
  }

  console.log(req.url);
  console.log(req.orginalUrl);

  if (!token) {
    if(req.originalUrl === "/api/auth_status") {
      return res.status(200).json({auth: false, id: null, message: 'Not authenticated'})
    } else {
      return res.status(401).json({auth: false, message: 'No token provided.'});
    }
  }

  jwt.verify(token, secret_key, function(err, decoded) {
    if (err) {
      console.log(err);
      if(err.message == "jwt expired") {
        return res.status(498).json({auth: false, id: null, message: 'Token expired'});
      } else {
        return res.status(500).json({auth: false, id: null, message: 'Server Error: Failed to authenticate token.'});
      }
    } else {
      console.log("decoded token", decoded);
      req.userID = decoded._id;
      req.token = token;
      console.log(req.userID);
      console.log(typeof req.userID);
      next();
    }
  });
};

module.exports = verifyToken;
