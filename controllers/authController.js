var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var db = require("../models");

const authController = {

  register: function(req, res) {
    console.log(req.body);

    db.User
      .findOne({email: req.body.email})
      .then((user) => {
        if(user) {
          console.log(user);
          //If email already exists in db, send 409 response, User already exists
          res.status(409).json({auth: false, id: null, message: "User already exists"})
        } else {

          //If no matching email found in db, create new account
          const hashedPassword = bcrypt.hashSync(req.body.password, 8);

          db.User.create({
              name: req.body.name,
              email: req.body.email,
              password: hashedPassword
            })
            .then(function(newUser) {
              console.log(newUser);
              res.redirect(307, "/api/login")
            })
            .catch(function(err) {
              return res.status(500).send("There was a problem registering the user.");
            })
          }
        })
        .catch((err) => {
          return res.status(500).send("There was a problem registering the user.");
        })
    },


  //Method to login an existing user
  login: function(req, res) {
    const secret_key = process.env.SECRET_KEY;
    console.log(secret_key);
    console.log(req.body);

    db.User
      .findOne({email: req.body.email})
      .then((user) => {

        console.log("USER");
        console.log(user);
        //If no email matches, send 404, user not found
        if(!user) {
          return res.status(404).json({
            auth: false,
            token: null,
            message: 'User not found'
          });

        } else if(user) {

          console.log("Else if triggered");
          //Compare hashed password with user input password
          var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
          console.log(passwordIsValid);

          //If password invalid, send 401, wrong password
          if(!passwordIsValid) {
            return res.status(401).json({
              auth: false,
              token: null,
              message: 'Wrong password'
            });
          }

          // If user found and password matches, return JWT with id, name, and email encoded in payload
          var token = jwt.sign({id: user._id, name: user.name, email: user.email}, secret_key, {expiresIn: "2h"});
          res.status(200).json({ auth: true, token: token });
        }
      })
      .catch((err) => {
        return res.status(500).send("There was an internal server error trying to find the user.");
      })
    },

    // Determines user authenication status - should be called on page load
    authStatus: function(req, res) {
      //Send ID if token exists and valid
      res.json({auth: true, id: req.userID, message: "Authenticated"});
    }
}

module.exports = authController;

//**** ROUTES FOR LOGIN AND REGISTRATION ****//
//=========================================//
// router.post('/register', function (req, res) {
//
//   db.User.findOne({
//     where: {
//       email: req.body.email
//     }
//   }).then(function(user) {
//     if(user) {
//       res.status(409).json({auth: false, id: null, message: "User already exists"})
//     } else {
//
//       var hashedPassword = bcrypt.hashSync(req.body.password, 8);
//
//       db.User.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: hashedPassword
//           })
//           .then(function(newUser) {
//             res.redirect(307, "/api/login")
//           })
//           .catch(function(err) {
//             return res.status(500).send("There was a problem registering the user.");
//           })
//       }
//     });
//   });
//
// //LOGS-IN AN EXISTING USER
// router.post('/login', function (req, res) {
//   var secret_key = process.env.SECRET_KEY;
//
//   //Find the user
//   db.User.findOne({
//     where: {email: req.body.email}
//   })
//   .then(function(user) {
//     if(!user) {
//       return res.status(404).json({
//         auth: false,
//         token: null,
//         message: 'User not found'
//       });
//
//     } else if(user) {
//
//       var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
//
//       if(!passwordIsValid) {
//         return res.status(401).json({
//           auth: false,
//           token: null,
//           message: 'Wrong password'
//         });
//       }
//
//       var token = jwt.sign({id: user.id, name: user.name, email: user.email}, secret_key, {expiresIn: "2h"});
//       res.status(200).json({ auth: true, token: token });
//     }
//
//   })
//   .catch(function(err) {
//     return res.status(500).send("There was an internal server error trying to find the user.");
//   })
// });
//
// module.exports = router;
