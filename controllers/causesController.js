const db = require("../models");

// Defining methods for the booksController
const causesController = {
  findAll: function(req, res) {
    db.Event
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

module.exports = causesController;
