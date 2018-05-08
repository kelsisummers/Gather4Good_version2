const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose =  require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const verifyToken = require("./server_utils/middleware/VerifyToken.js")


const apiRoutes = require("./routes/api/apiRoutes.js");
const protectedApiRoutes = require("./routes/api/protectedApiRoutes.js");
const serveIndexRoute = require("./routes/serveIndexRoute.js");


// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
app.use(express.static("client/build"));


app.use("/api", apiRoutes);
app.use("/api", verifyToken);
app.use("/api", protectedApiRoutes);
app.use(serveIndexRoute);

//app.use(routes);


// Connect to the Mongo DB (Ben's local db)
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/g4gdev");

// Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/gather4goodevents");

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
