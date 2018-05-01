const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/g4gdev");

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
    cause: "5ae7cfa9bf3a953570c4c30f"
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
    cause: "5ae289a76ff9501210d708bb"
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
];

const commentSeed = [
  {
    body: "This is the body for comment 1, on 'Earth Day Columbus.'",
    eventId: "5ae28a9def135723b8e5525d"
  },
  {
    body: "This is the body for comment 2, on 'Earth Day Columbus.'",
    eventId: "5ae28a9def135723b8e5525d"
  },
  {
    body: "This is the body for comment 3, on 'Earth Day Columbus.'",
    eventId: "5ae28a9def135723b8e5525d"
  },
  {
    body: "This is the body for comment 1, on 'Save the Chinchillas!.'",
    eventId: "5ae28a9def135723b8e5525e"
  },
  {
    body: "This is the body for comment 2, on 'Save the Chinchillas!.'",
    eventId: "5ae28a9def135723b8e5525e"
  }
];

const userSeed = [
  {
    name: "John Doe'",
    email: "john@email.com",
    password: "helloworld"
  },
  {
    name: "Jane Doe",
    email: "jane@email.com",
    password: "password100"
  },
  {
    name: "Greg Brodzik",
    email: "greg@email.com",
    password: "youwillneverguessit!@300"
  },
];



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

const seedEvents = () => {
  db.Event
    .remove({})
    .then(() => db.Event.collection.insertMany(eventSeed))
    .then(data => {
      console.log(data);
      console.log(data.insertedIds.length + " records inserted!");
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });

}

const seedComments = () => {
  db.Comment
    .remove({})
    .then(() => db.Comment.collection.insertMany(commentSeed))
    .then(data => {
      console.log(data);
      console.log(data.insertedIds.length + " records inserted!");
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });

}


const seedUsers = () => {
  console.log("seed users called");
  db.User
    .remove({})
    .then(() => db.User.collection.insertMany(userSeed))
    .then(data => {
      console.log(data);
      console.log(data.insertedIds.length + " records inserted!");
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

// seedCauses();
seedEvents();
seedComments();
seedUsers();
