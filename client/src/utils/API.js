import axios from "axios";

export default {

  // Retrieves full list of causes from db
  getCauses: function() {
    console.log("get causes called - front end");
    return axios.get("/api/causes");
  },

  // Saves a new event to db
  saveEvent: function(eventData) {
    console.log(eventData);
    console.log("save event called - front end");
    return axios.post("/api/events", eventData);
  }

};
