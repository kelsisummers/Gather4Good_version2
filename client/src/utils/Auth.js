import axios from "axios";
import decode from "jwt-decode";

export default {

  determineAuthStatus: function() {

    const token = localStorage.getItem("token");
    return axios.get("/api/auth_status", { headers: { 'x-access-token': token } })
      .then(response => {
        let data = response.data;

        if(data.auth === true) {
          const decoded = decode(data.token);
          data._id = decoded._id;
          data.email = decoded.email;
          data.name = decoded.name;
        }

        return data;
      })
      .catch((error) => {
        console.log("catch called");
        let data = error.response.data;

        localStorage.removeItem("token");
        console.log(localStorage.getItem("token"));

        return Promise.reject(data);
      });
  },

  submitLogin: function(credentials) {

    const options = {
      method: 'POST',
      url: "/api/login",
      data: credentials
    }

    return axios(options)
      .then((response) => {
        let data = this.saveTokenAndSetUserData(response.data);
        return data;
      })
      .catch((error) => {
        let data = error.response.data;
        return Promise.reject(data);
      })
  },

  submitRegistration: function(userData) {

    const options = {
      method: 'POST',
      url: "/api/register",
      data: userData
    }

    return axios(options)
      .then((response) => {
        let data = this.saveTokenAndSetUserData(response.data);
        return data;
      })
      .catch((error) => {
        let data = error.response.data;
        return Promise.reject(data);
      })
  },

  saveTokenAndSetUserData: function(data) {
    localStorage.setItem("token", data.token);
    const token = localStorage.getItem("token");

    ////Decode token and embed user-specifc info in data object
    const decoded = decode(token);
    data._id = decoded._id;
    data.email = decoded.email;
    data.name = decoded.name;

    console.log("data in new fxn");
    console.log(data);
    return data;
  }

}
