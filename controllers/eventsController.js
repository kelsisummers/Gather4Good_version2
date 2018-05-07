const db = require("../models");

const eventsController = {
  findAll: function(req, res) {
    console.log(req.query);
    console.log(req.query.dateTime);

    let query = { dateTime: { $gte: Date.now() } }

    if (req.query.dateTime) {
      query.dateTime.$gte = req.query.dateTime
    }
    if (req.query.location) {
      query.location_state = req.query.location
    }
    if (req.query.cause) {
      query.cause = req.query.cause
    }
    if (req.query.userId) {
      query.$or = [
        {organizer_id: req.query.userId},
        {attendees: {
          $in: [req.query.userId]}
        }
      ]
    }

    db.Event
      .find(query)
      .populate("cause")
      .sort({ dateTime: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findById: function(req, res) {
    db.Event
      .findById(req.params.id)
      .populate("cause comments attendees")
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

    console.log("Update called - backend");
    console.log("REQ.BODY");
    console.log(req.body);
    console.log("REQ.PARAMS.ID");
    console.log(req.params.id);

    console.log("req.query.action: ", req.query.action);
    console.log("req.query: ", req.query);

    let query;
    let action = req.query.action;
    console.log(action);

    switch(action) {
      case "updateEvent":
        query = req.body;
        break;
      case "join":
        query = {$addToSet: {attendees: req.body.attendee}};
        break;
      case "unjoin":
        query = {$pull: {attendees: req.body.attendee}}
        break;
    }

    db.Event
      .findOneAndUpdate({ _id: req.params.id }, query, { new: true })
      .populate("cause")
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
