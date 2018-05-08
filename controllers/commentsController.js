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

    remove: function(req, res) {
        console.log("Delete comment called - back end");
        console.log(req.query.commentId);
        db.Comment
            .findByIdAndRemove(req.query.commentId, (err) => {
                if (err) return res.status(500).send(err);
                db.Event
                    .findOneAndUpdate({ _id: req.params.id }, { $pull: {comments: req.query.commentId}})
                    .then((dbEventModel) => {
                        console.log(dbEventModel);
                        res.json(dbEventModel);
                    })
            })
    },

    getCommentsByEvent: function(req, res) {
        let eventId = req.params.id;
        db.Comment
            .find({ query: { eventId: eventId }})
            .sort({ dateTime: -1 })
            .then(dbModel => {
                console.log(dbModel);
                res.json(dbModel);
            })
            .catch(err => res.status(422).json(err));
    }
};

module.exports = commentsController;
