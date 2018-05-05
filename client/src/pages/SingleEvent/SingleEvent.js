import React, { Component } from "react";
import "./SingleEvent.css";
import { Event, DiscussionContainer, RelatedEvents } from "../../components/single-event";
import API from "../../utils/API.js";
import Auth from "../../utils/Auth.js";
import moment from "moment";
import CreateEvent from "../CreateEvent/CreateEvent.js"

class SingleEvent extends Component {

    state = {
        error: null,
        isLoaded: false,
        event: [],
        //full list of causes to populate drop-down when editing event
        causes: [],
        attending: false,
        isOrganizer: false,
        isEditingEvent: false,
        editEvent: {},
        //handles focus of Calendar to edit event
        focused: false
    };

    // Once Container mounts, sends request to server to retrieve events (will probably want to query for a single event by id, obtained
    //  through props), updates state, and renders SingleEvent with the data.
    componentDidMount() {

        let promises = [API.getEvent(this.props.match.params.id), API.getCauses()];

        Promise.all(promises)
          .then((values) => {
            console.log("VALUES");
            console.log(values);
            const event = values[0];
            const causes = values[1];

            let editEvent = event.data;
            editEvent.date = moment(event.data.dateTime, moment.ISO_8601);
            editEvent.time = moment(event.data.dateTime, moment.ISO_8601);

            this.setState({
                isLoaded: true,
                event: event.data,
                editEvent,
                attending: event.data.attendees.includes(this.props.authData.user_id), // Checks if userId matches any in Attendee array.
                isOrganizer: (this.props.authData.user_id === event.data.organizer_id),
                causes: causes.data
            });
          }, (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          })
    };

    parseDateTime = (isoDateTimeStr) => {
      console.log('helloworld')



    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
      console.log(prevProps);
      console.log("Component did update called");
      console.log(prevProps.authData.user_id);
      console.log(this.props.authData.user_id);

      if(this.props.isAuthenticated === false) {
        this.setState({isOrganizer: false, attending: false, isEditing: false});
      } else {
        if(prevProps.authData.user_id !== this.props.authData.user_id) {
          this.setState({isOrganizer: (this.props.authData.user_id === this.state.event.organizer_id)})
                        //attending: this.state.event.attendees.includes(this.props.authData.user_id)})
        }
      }

    }

    handleEditToggle = (event) => {
       this.setState({isEditingEvent :  !this.state.isEditingEvent})
    }

    handleButtonClick = (event) => {
        let btnType = event.target.dataset.type;
        let userId = this.props.authData.user_id;
        let eventId = this.state.event._id;
        console.log(userId);
        console.log(eventId);
        switch (btnType) {
            case "join":
                // logic to join an event
                if(Auth.isTokenNullOrExpired()) {
                    this.props.authFunctions.clearAuthAndShowModal("joinEvent");
                } else {
                    API.joinEvent(userId, eventId)
                        .then((event) => {
                          console.log( )
                            this.setState({
                                attending: event.data.attendees.includes(this.props.authData.user_id),
                                event: event.data
                            })
                        }) // Need to work out error handling here... i.e. the user is not logged in.
                }
                break;
            case "share":
                // logic to share an event
                alert(btnType);
                break;
            case "contact":
                //logic to contact organizer
                alert(btnType);
                break;
            default:
                alert(btnType);
        }
    };

    handleEdit = (event) =>  {
      const { name, value } = event.target;

      let editEvent = {...this.state.editEvent};
      editEvent[name] = value;
      this.setState({editEvent});

      if(name === "causeType") {
        const option = event.target.options[event.target.selectedIndex];
        const causeId = option.attributes.getNamedItem("data-cause-id").value;
        editEvent.causeId = causeId;

        this.setState({editEvent}, () => {
          console.log("Update CauseId State:");
          console.log(this.state.editEvent);
        });
      }
    }

    handleDateChange = (date) => {
      console.log(date._d);

      let editEvent = {...this.state.editEvent};
      editEvent.date = date;

      this.setState({editEvent}, () => {
        console.log(this.state.editEvent.date);
      });
    }


    handleDateFocusChange = ({focused}) =>  {
      console.log(focused);

      this.setState({focused: focused}, () => {
        console.log(this.state.focused);
      });
    }

    handleTimeChange = (value) => {
      console.log(value && value.format('h:mm a'));

      let editEvent = {...this.state.editEvent};
      editEvent.time = value;

      this.setState({editEvent}, () => {
        console.log("Time state:");
        console.log(this.state.editEvent.time);
      });
    }

    createDateTimeStr = () => {
      const dateStr = this.state.editEvent.date._d.toDateString();
      const timeStr = this.state.editEvent.time._d.toTimeString();
      const new_date = `${dateStr} ${timeStr}`;
      const ISO_DATE_TIME = new Date(new_date).toISOString();
      console.log("dateStr: " + dateStr);
      console.log("timeStr: " + timeStr);
      console.log(ISO_DATE_TIME);

      return ISO_DATE_TIME;
    }

    handleEditSubmit = () => {
      const ISO_DATE_TIME = this.createDateTimeStr();
      const {eventName, eventDescription, imgUrl, locationName} = {...this.state.editEvent};
      const {streetAddress, city, USstate, zipcode, causeId} = {...this.state.editEvent};

      const updatedEventData = {
        title: eventName,
        dateTime: ISO_DATE_TIME,
        description: eventDescription,
        img_url: imgUrl,
        location_name: locationName,
        location_street: streetAddress,
        location_city: city,
        location_state: USstate,
        location_zip: zipcode,
        cause: causeId
      }

      console.log(updatedEventData);

      API.update(updatedEventData)
        .then(res => {
          console.log("Result returned when generating updating event")
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    }

    render() {
        console.log("What is state?", this.state.event)
        console.log("....")
        console.log(this.state.attending);
        console.log("Is organizer:", this.state.isOrganizer);
        const { error, isLoaded, event, attending, isOrganizer, editEvent, isEditingEvent, causes, focused } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (

                <div>
                    <Event
                        data={event}
                        editData={editEvent}
                        handleEdit={this.handleEdit}
                        handleButtonClick={this.handleButtonClick}
                        attending={attending}
                        isOrganizer={isOrganizer}
                        handleEditToggle={this.handleEditToggle}
                        isEditingEvent={isEditingEvent}
                        causes={causes}
                        handleDateChange={this.handleDateChange}
                        handleDateFocusChange={this.handleDateFocusChange}
                        handleTimeChange={this.handleTimeChange}
                        focused={focused}
                    />
                    {/* <DiscussionContainer
                    data={this.props.event}
                    />
                    <RelatedEvents
                    eventCause="eventJSON.cause"
                    /> */}
                </div>
            );
        }
    }

}

export default SingleEvent;
