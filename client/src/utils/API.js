import axios from "axios";

export default {

  // Retrieves full list of causes from db
  getCauses: function() {
    console.log("get causes called - front end");
    return axios.get("/api/causes");
  },

  // Saves a new event to db
  createEvent: function(eventData) {
    console.log("create event called - front end");
    console.log("event data in create event fucntion - front end:")
    console.log(eventData);
    return axios.post("/api/events", eventData);
  },

  // Retrieves an event from db
  getEvent: function(id) {
    console.log("get event called - front end");
    return axios.get(`/api/events/${id}`);
  },

  // Retrieves all comments for a specific event from db
  getCommentsByEvent: function(id) {
    console.log("get comments called - front end");
    return axios.get(`/api/comments/${id}`);
  },
  
  // Retrieves all events from db
  getAllEvents: function() {
    console.log("get events called - front end");
    return axios.get("/api/events");
  }

};
