import React from "react";
import "./ModalCTA.css";

const ModalCTA = (props) => {

    let CTA;
    switch(props.modalTriggerType) {
      case "createEvent":
          CTA = <div className="modalCTA">{`Login or register to create your event`}</div>
          break;
      case "joinEvent":
          CTA = <div className="modalCTA">{`Login or register to join the event`}</div>
          break;
      case "getMyEvents":
          CTA = <div className="modalCTA">{`Login or register to view your events`}</div>
          break;
      case "createComment":
          CTA = <div className="modalCTA">{`Login or register to post your comment`}</div>
          break;
      default:
          CTA = null;
    }

    return ( CTA );
}

export default ModalCTA;
