import React, {Component} from "react";
import "./EventForm.css";


class EventForm extends Component {
  render() {
      return (
      <div className="component-wrapper">
        <div className="form-head">
          <h2>Create an Event</h2>
        </div>
        <div className="form-container">
          <form>
            <h3>Step 1: Tell Us About Your Event </h3>
            <div className="form-step-wrapper">
  						<input
                type="text"
                name="eventName"
                placeholder="Event Name"
              />
					  </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EventForm;
