import axios from "axios";
import decode from "jwt-decode";

export default {

  verifyToken: function() {

    const token = localStorage.getItem("token");
    return axios.get("/api/auth_status", { headers: { 'x-access-token': token } })
      .then(response => {

        let data = response.data;
        const decoded = decode(data.token);

        data._id = decoded._id;
        data.email = decoded.email;
        data.name = decoded.name;

        return data;
        
      })
      .catch((error) => {

        let data = error.response.data;
        localStorage.removeItem("token");
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

    // Decode token and embed user-specifc info in data object
    const decoded = decode(token);
    data._id = decoded._id;
    data.email = decoded.email;
    data.name = decoded.name;

    return data;
  },

  isTokenNullOrExpired: function() {
    const token = localStorage.getItem("token");

    if(token === null) {
      return true;
    }

    const decoded = decode(token);

    if(decoded.exp < Date.now() / 1000 ) {
      console.log("Token has expired.");
      localStorage.removeItem("token");
      return true
    } else {
      console.log("Token not expired.");
      console.log("Seconds until expiration: " + (decoded.exp - (Date.now() / 1000)))
      return false;
    }

  }

}
