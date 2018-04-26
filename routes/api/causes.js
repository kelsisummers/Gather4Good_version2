const router = require("express").Router();
const causesController = require("../../controllers/causesController");

// Matches with "/api/events"
router.route("/")
  .get(causesController.findAll)

module.exports = router;
