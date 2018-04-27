const db = require("../models");

// Defining methods for the commentsController
const commentsController = {
    create: function (req, res) {
        console.log(req.body);
        db.Comment
            .create(req.body)
            .then(dbModel => {
                console.log("comment created in db");
                console.log(dbModel);
                res.json(dbModel)
            })
            .catch(err => res.status(422).json(err));
    },
    getCommentsByEvent: function(req, res) {
        let eventID = req.params.id;
        db.Comment
            .find({ eventId : eventID})
            .then(dbModel => {
                console.log(dbModel);
                res.json(dbModel);
            })
            .catch(err => res.status(422).json(err));
    }
};

module.exports = commentsController;