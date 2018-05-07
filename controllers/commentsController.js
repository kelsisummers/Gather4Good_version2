const db = require("../models");

// Defining methods for the commentsController
const commentsController = {
    create: function (req, res) {
        console.log("Post comment called - back end");
        db.Comment
            .create(req.body)
            .then(dbModel => {
                console.log("comment created in db");
                console.log(dbModel);
                db.Event
                    .findOneAndUpdate({ _id: req.params.id }, {$push: {comments: dbModel._id}})
                    .then(dbEventModel => {
                        console.log(dbModel);
                        res.json(dbEventModel);
                    })
                    .catch(err => res.status(422).json(err));
            })
            .catch(err => res.status(422).json(err));
    },
    getCommentsByEvent: function(req, res) {
        let eventId = req.params.id;
        db.Comment
            .find({ eventId : eventId })
            .then(dbModel => {
                console.log(dbModel);
                res.json(dbModel);
            })
            .catch(err => res.status(422).json(err));
    }
};

module.exports = commentsController;