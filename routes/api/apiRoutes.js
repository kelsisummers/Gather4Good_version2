const router = require("express").Router();
const eventsController = require("../../controllers/eventsController");
const causesController = require("../../controllers/causesController");
const commentsController = require("../../controllers/commentsController");
const authController = require("../../controllers/authController");

// GET all comments for an event by event :id
router.route("/events/:id/comments")
  .get(commentsController.getCommentsByEvent)

// GET event by :id - Probably going merge this route into just "/events" endpoint
// using query string. But keep for now
router.route("/events/:id")
  .get(eventsController.findById)

// GET all events - will specify db query params (e.g., location, userid) through query string
router.route("/events")
  .get(eventsController.findAll)

// GET causes -- specify cause through query string
router.route("/causes")
  .get(causesController.findAll)


// ** AUTH-RELATED ROUTES ** //

// Register new user
router.route("/register")
  .post(authController.register)

// Logs in an existing user, and succesful registration
// redirects to this endpoint
router.route("/login")
  .post(authController.login)


module.exports = router;
