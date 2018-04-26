const router = require("express").Router();
const eventRoutes = require("./events");
const causeRoutes = require("./causes")

// Event routes
router.use("/events", eventRoutes);
router.use("/causes", causeRoutes);

module.exports = router;
