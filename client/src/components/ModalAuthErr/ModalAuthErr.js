import React from "react";
import "./ModalAuthErr.css";

const ModalAuthErr = (props) => {

    let error;
    switch(props.auth_error) {
      case "User not found":
          error = <div className="modalAuthErr">{`Sorry, we couldn't find a user with that email address`}</div>
          break;
      case "Wrong password":
          error = <div className="modalAuthErr">{`Wrong password - try again.`}</div>
          break;
      case "User already exists":
          error = <div className="modalAuthErr">{`Sorry, but that email is already registered. If you're registered, proceed to login.`}</div>
          break;
      default:
          error = null;
    }

    return ( error );
}

export default ModalAuthErr;
