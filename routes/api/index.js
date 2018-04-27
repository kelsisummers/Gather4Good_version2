const router = require("express").Router();
const eventRoutes = require("./events");
const causeRoutes = require("./causes");
const commentRoutes = require("./comments");

// Event routes
router.use("/events", eventRoutes);
router.use("/causes", causeRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
