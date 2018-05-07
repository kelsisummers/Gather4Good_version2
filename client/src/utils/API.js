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

  //Updates data for an event
  updateEvent: function(id, updatedEventData) {
    const token = localStorage.getItem("token");
    console.log("token....." + token);
    console.log("ID IN UPDATE EVENT - FRONT END");
    console.log(id);
    console.log("UpdatedEventData in UPDATEEVENT - FRONT END");
    console.log(updatedEventData);

    return axios.put(`/api/events/${id}?action=updateEvent`, updatedEventData, { headers: { 'x-access-token': token } });
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

  submitComment: function(comment) {
    console.log("post comment called - front end");
    const token = localStorage.getItem("token"); 
    return axios({
      headers: { 'x-access-token': token },
      url: `/api/events/${comment.eventId}/comments`,
      method: "post",
      data: comment
    });
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
    console.log("Selected date front end", selectedDate);
    return axios.get("/api/events", {params: {dateTime: selectedDate}});
  },

  getEventsByLocation: function(location) {
    console.log("Selected location front end", location);
    return axios.get("/api/events", {params: {location: location}});
  },

  getUserEvents: function(userId) {
    console.log(userId)
    const token = localStorage.getItem("token");
    return axios({
      headers: { 'x-access-token': token },
      url: "/api/events",
      method: "get",
      params: {
        userId: userId,
      }
    });
  },

  joinEvent: function(userId, eventId, action) {
    const token = localStorage.getItem("token");
    console.log("join event caused - front end");
    console.log(userId);
    console.log(eventId);
    console.log(action);

    return axios({
      headers: { 'x-access-token': token },
      url: `/api/events/${eventId}?action=${action}`,
      method: "put",
      data: {
        attendee: userId,
      }
    });
  }

};
