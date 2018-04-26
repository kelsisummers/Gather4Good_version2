const db = require("../models");

// Defining methods for the booksController
const causesController = {
  findAll: function(req, res) {
    console.log("find all causes function called - backend");
    db.Event
      .find(req.query)
      .then(dbModel => {
        console.log("Causes returned:");
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  }
};

module.exports = causesController;
