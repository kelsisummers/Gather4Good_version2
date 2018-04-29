const router = require("express").Router();
const eventsController = require("../../controllers/eventsController");

// Matches with "/api/events"
router.route("/")
  .get(eventsController.findAll)
  .post(eventsController.create);

// Matches with "/api/events/:id"
router.route("/events")
  .get(eventsController.findAll)
  .get(eventsController.findById)


// ** Routes currently with no controller functionality ** //
router.route("/register")
  .post(authController.register)

route.route("/login")
  .post(authController.login)


module.exports = router;
