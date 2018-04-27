const router = require("express").Router();
const commentsController = require("../../controllers/commentsController");

// Matches with "/api/comments"
router.route("/")
    .post(commentsController.create);

router.route("/:id")
    .get(commentsController.getCommentsByEvent);

module.exports = router;