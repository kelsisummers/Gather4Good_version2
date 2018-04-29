const router = require("express").Router();
const eventsController = require("../../controllers/eventsController");
const causesController = require("../../controllers/causesController");
const commentsController = require("../../controllers/commentsController");
const authController = require("../../controllers/authController");

// POST a comments for an event by event :id
// DELETE a comment for an event by :id -- pass comment :id in query string
router.route("/events/:id/comments")
  .post(commentsController.create)
  //.delete(commentsController.remove)

// PUT - Edit an event, including adding/removing attendees
// DELETE an event
router.route("/events/:id")
  .put(eventsController.update)
  .delete(eventsController.remove)

// POST a new event
router.route("/events")
  .post(eventsController.create)


// Route to determine user's authentication status - should be called on each page load
// to properly render display. Send auth status of true and user data if JWT exists and valid
router.route("/auth_status")
  .get(authController.authStatus)


module.exports = router;
