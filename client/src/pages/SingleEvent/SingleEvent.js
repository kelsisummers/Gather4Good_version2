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
        editEventInitialState: {},
        //handles focus of Calendar to edit event
        focused: false
    };

    // Once Container mounts, sends request to server to retrieve events (will probably want to query for a single event by id, obtained
    //  through props), updates state, and renders SingleEvent with the data.
    componentDidMount() {

      this.getEventData();

    }

     getEventData = () => {
       let promises = [API.getEvent(this.props.match.params.id), API.getCauses()];

       Promise.all(promises)
         .then((values) => {
           console.log("VALUES");
           console.log(values);
           const event = values[0];
           const causes = values[1];

           let editEvent = {...event.data};
           editEvent.date = moment(event.data.dateTime, moment.ISO_8601);
           editEvent.time = moment(event.data.dateTime, moment.ISO_8601);
           editEvent.cause = event.data.cause._id;
           let editEventInitialState = {...editEvent};

           this.setState({
               isLoaded: true,
               event: event.data,
               editEvent,
               editEventInitialState,
               attending: event.data.attendees.includes(this.props.authData.user_id), // Checks if userId matches any in Attendee array.
               isOrganizer: (this.props.authData.user_id === event.data.organizer_id),
               causes: causes.data
           }, () => {
             if(this.state.isEditingEvent) {
               this.setState({isEditingEvent: false});
             }
           });
         }, (error) => {
           this.setState({
             isLoaded: true,
             error
           });
         })

     }


    static getDerivedStateFromProps(nextProps, prevState) {
      console.log("get derived state called");
      console.log(prevState);
      console.log(nextProps);
      console.log("Previos state ");
      console.log(nextProps.authData.isAuthenticated);
      console.log("Previous state of origanizer id");
      console.log(prevState.event.organizer_id);
      console.log("Previous state of attendees");
      console.log(prevState.event.attendees);


      if(nextProps.authData.isAuthenticated === false) {
         return {
           isOrganizer: false,
           attending: false,
           isEditingEvent: false
         }
      } else if(nextProps.authData.isAuthenticated === true && prevState.event.attendees && prevState.event.organizer_id) {
        return {
          attending: (prevState.event.attendees.includes(nextProps.authData.user_id)),
          isOrganizer: (nextProps.authData.user_id === prevState.event.organizer_id),
        }
      }

      // No state update necessary
      return null;
    }


    handleEditToggle = (event) => {
       this.setState({isEditingEvent :  !this.state.isEditingEvent}, () => {
         if(!this.state.isEditingEvent) {
          this.setState({editEvent: this.state.editEventInitialState})
         }
       })
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
      console.log(this.state.editEvent);
      const { name, value } = event.target;

      let editEvent = {...this.state.editEvent};
      editEvent[name] = value;
      this.setState({editEvent});

      if(name === "cause") {
        const option = event.target.options[event.target.selectedIndex];
        const causeId = option.attributes.getNamedItem("data-cause-id").value;
        editEvent.cause = causeId;

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

    createDateTimeStr = (date, time) => {
      const dateStr = date .toDateString();
      const timeStr = time.toTimeString();
      const new_date = `${dateStr} ${timeStr}`;
      const log_date = new Date(new_date);
      console.log(log_date);
      const ISO_DATE_TIME = new Date(new_date).toISOString();
      console.log("dateStr: " + dateStr);
      console.log("timeStr: " + timeStr);
      console.log(ISO_DATE_TIME);

      return ISO_DATE_TIME;
    }



    handleEditSubmit = () => {
      console.log("HANDLE EDIT SUBMIT CALLED");
      const ISO_DATE_TIME = this.createDateTimeStr(this.state.editEvent.date._d, this.state.editEvent.time._d);
      let updatedEventData = {...this.state.editEvent};

      console.log("*******UPDATED DATEITM*******");
      console.log(ISO_DATE_TIME);
      console.log("*******UPDATED DATA******");
      console.log(updatedEventData);

      updatedEventData.dateTime = ISO_DATE_TIME;
      delete updatedEventData.attendees; delete updatedEventData.date;
      delete updatedEventData.time; delete updatedEventData.organizer_id;
      delete updatedEventData._id;

      console.log("UDPATED DATA AFTER CUTTING");
      console.log(updatedEventData);

      API.updateEvent(this.state.event._id, updatedEventData)
        .then(res => {
          console.log("Result returned when generating updating event")
          console.log(res);
          this.getEventData();
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
                        handleEditSubmit={this.handleEditSubmit}
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
