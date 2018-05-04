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
    const token = localStorage.getItem("token");
    console.log("token....." + token);
    return axios.post("/api/events", eventData, { headers: { 'x-access-token': token } });
  },

  // Retrieves an event from db
  getEvent: function(id) {
    console.log("get event called - front end");
    return axios.get(`/api/events/${id}`);
  },

  // Retrieves all comments for a specific event from db
  getCommentsByEvent: function(id) {
    console.log("get comments called - front end");
    return axios.get(`/api/events/${id}/comments`);
  },

  // Retrieves all events from db
  getAllEvents: function() {
    console.log("get events called - front end");
    return axios.get("/api/events");
  },

  getEventsByCause: function(causeId) {
    console.log("get events by cause called - front end");
    return axios.get("/api/events", {
      params: {
        cause: causeId
      }
    });
  },

  getEventsByDate: function(selectedDate) {
    return axios.get("/api/events", {
      query: {
        dateTime: {
          $gte: selectedDate
        }
      }
    });
  },

  joinEvent: function(userId, eventId) {
    const token = localStorage.getItem("token");
    console.log("join event caused - front end");
    return axios({
      headers: { 'x-access-token': token },
      url: "/api/events/" + eventId,
      method: "put",
      data: {
        attendee: userId,
      }
    });
  }

};
