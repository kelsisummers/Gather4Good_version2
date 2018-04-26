const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/gather4goodevents");

const eventSeed = [
  {
    title: "Earth Day Columbus",
    dateTime: new Date(Date.now()),
    description:
      "Earth Day Columbus is the largest volunteer-led Earth Day service effort in the U.S. Organized annually by Green Columbus, a Central Ohio nonprofit.",
    img_url: "https://static1.squarespace.com/static/580ac286be6594479600b400/t/586e453fbe659461a743ad52/1516552077692/",
    location_name: "The Park",
    location_street: "605 N High St, Suite 229",
    location_city: "Columbus",
    location_state: "OH",
    location_zip: "43215",
    cause: "1"
  },
  {
    title: "Save the Chinchillas!",
    dateTime: new Date(Date.now()),
    description:
      "We're fighting to conserve this beautiful species. Let's come together to raise money and awareness to help protect the chinchillas!",
    img_url: "https://www.petmd.com/sites/default/files/chinchilla-fun-facts.jpg",
    location_name: "The Refuge",
    location_street: "123 Main St",
    location_city: "Portland",
    location_state: "OR",
    location_zip: "97204",
    cause: "2"
  }
];

const causeSeed = [
  { name: "Gender Equality" },
  { name: "LGBTQ Rights" },
  { name: "Environment" },
  { name: "Racial Equality" },
  { name: "Animal Rights" },
  { name: "Education" },
  { name: "Human Rights" },
  { name: "Immigration" },
  { name: "Public Health" },
  { name: "Economic Equality" },
  { name: "Gun Control" },
]


const seedCauses = () => {
  db.Cause
    .remove({})
    .then(() => db.Cause.collection.insertMany(causeSeed))
    .then(data => {
      console.log(data);
      console.log(data.insertedIds.length + " records inserted!");
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

db.Event
  .remove({})
  .then(() => db.Event.collection.insertMany(eventSeed))
  .then(data => {
    console.log(data);
    console.log(data.insertedIds.length + " records inserted!");
    seedCauses();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
