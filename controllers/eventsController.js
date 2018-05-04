const db = require("../models");

// Defining methods for the booksController
const eventsController = {
  findAll: function(req, res) {
    console.log(req.query);
    db.Event
      .find({
              dateTime: {
                $gte: Date.now()
              }
            })
      .sort({ dateTime: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Event
      .findById(req.params.id)
      .populate("cause")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log("Server recieved request to create event")
    console.log(req.body);
    db.Event
      .create(req.body)
      .then(dbModel => {
        console.log(".....event object created in db:")
        console.log(dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {

    console.log("Update called");
    let query;
    if(!!req.body.attendee) {
      query = {$addToSet: {attendees: req.body.attendee}};
    } else if(!!req.body.newEventData) {
      query = req.body;
    }

    db.Event
      .findOneAndUpdate({ _id: req.params.id }, query)
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    console.log("removed funciton called");
    db.Event
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

module.exports = eventsController;
