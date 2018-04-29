import axios from "axios";

export default {

  determineAuthStatus: function() {

    const USER_TOKEN = localStorage.getItem("token");
    axios.get("/api/auth_status", { headers: { 'x-access-token': USER_TOKEN } })
      .then(response => {
        console.log(response.data);
        console.log(response.data.message);

        if(response.data.message === "Authenticated") {
          //hideLoginAndDismissModal();
          return true;
        } else if (response.data.message === "Not authenticated") {
          //showLoginAndHideLogout();
          return false;
        }

      })
      .catch((error) => {
        console.log(error.response.data.message);

        if(error.response.data.message === "Token expired") {
          localStorage.removeItem("token");
          console.log(localStorage.getItem("token"));
          return false;
        }

        //showLoginAndHideLogout();
      });
  },

  submitLogin: function(credentials) {

    const options = {
      method: 'POST',
      url: "/api/login",
      data: credentials
    }

    axios(options)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        console.log(localStorage.getItem("token"));
        //hideLoginAndDismissModal();
        return true;
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.data.message);
        var message = error.response.data.message;
        return false;
        //setNoUserOrWrongPwDisplay(message);
      })
  },

  submitRegistration: function(userData) {

    const options = {
      method: 'POST',
      url: "/api/register",
      data: userData
    }

    axios(options)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        //hideLoginAndDismissModal();
        return true;
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.data.message);
        var message = error.response.data.message;
        //setNoUserOrWrongPwDisplay(message);
        return false;
      })
  }

}
