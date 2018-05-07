import React, { Component } from "react";
import { Row, Col } from 'react-bootstrap';
import API from "../../utils/API.js";
import { Header, CauseButtons, EventCard, Controls, CauseDropdown } from "../../components/Home";
import tempFeatured from "./tempFeaturedEvents.json";
import "./Home.css";
import moment from "moment";
import Auth from "../../utils/Auth.js";

// Can also be included with a regular script tag



class Home extends Component {

  state = {
    error: null,
    isLoaded: false,
    events: [],
    causes: [],
    featured: tempFeatured,
    dateSelect: false,
    locationSelect: false,
    date: moment(),
    focused: false,
    USstate: "",
    eventStateList: []
  };

  // After componenet mounts, makes API call to query for all events and causes. Once received, updates state and loads child components.
  componentDidMount() {
    console.log("*****COMPONENT DID MOUNT FOR HOME PAGE CALLED*****");
    let promises = [API.getAllEvents(), API.getCauses()];
    Promise.all(promises)
      .then((values) => {
        console.log(values);

        this.setState({
          isLoaded: true,
          events: values[0].data,
          causes: values[1].data,
          eventStateList: this.setEventStateList(values[0].data)
        })
      }, (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      })
  };

  // Querys database for all events by cause and updates state with returned events.
  handleCauseButtonClick = (event) => {
    const causeId = event.target.getAttribute("causeid");
    return (
      API.getEventsByCause(causeId).then((events) => {
        console.log(events.data);
        this.setState({
          events: events.data
        })
      }, (error) => {
        this.setState({
          error
        });
      })
    )
  };

  // For now just alerts event button data, will implement logic to join event.
  // Will need to conditionally display join button if user logged in, obtain userID through auth.
  // Is join needed here? Or should we only have it on the single event page?
  handleJoinEventButtonClick(event) {
    alert(`Event: ${event.target.getAttribute("eventTitle")} \nEvent ID: ${event.target.getAttribute("eventId")}`);
  };

  displayDateSelector = () => {
    this.setState({ dateSelect: !this.state.dateSelect, locationSelect: false });
    console.log(this.state.date._d);
  }

  handleDateChange = (date) => {
    console.log("HandleDateChange: " + date._d);
    this.setState({ date }, () => {

      const selectedDate = this.state.date._d.toISOString();
      console.log(selectedDate);
      API.getEventsByDate(selectedDate).then((events) => {
        console.log(events.data);
        this.setState({
          events: events.data
        })
      }, (error) => {
        this.setState({
          error
        });
      })
    });

  }

  handleDateFocusChange = ({ focused }) => {
    this.setState({ focused: focused }, () => {
    });
  }

  sortByLocation = () => {
    // setState to sort by location, by city? proximity?
    this.setState({ locationSelect : !this.state.locationSelect, dateSelect: false });
  }

  // Runs get request obtain all events, sets state.events to all events.
  displayAllEvents = () => {
    API.getAllEvents()
      .then((events) => {
        this.setState({
          events: events.data,
          locationSelect: false,
          dateSelect: false
        })
      }, (error) => {
        this.setState({
          error
        });
      })
  }

  setEventStateList = (events) => {
    const uniqueStates = events.map(event => event.location_state)
                              .filter((v, i, a) => a.indexOf(v) === i)
                              .sort();
    return uniqueStates;
  }

  myEvents = () => {
    // setState to hold events user is attending or has organized.
    // Need to discuss how to handle this..
    if(Auth.isTokenNullOrExpired()) {
        this.props.authFunctions.clearAuthAndShowModal("getMyEvents");
    } else {
      const userId = this.props.authData.user_id
      API.getUserEvents(userId)
        .then((events) => {
          this.setState({
            events: events.data
          })
        }, (error) => {
          this.setState({
            error
          });
        })
    }


  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("Handle input change called");
    console.log("Name: " + name);
    console.log("Value: " + value);

    this.setState({[name]: value}, () => {
      console.log(this.state.USstate);
      if(name === "USstate" && this.state.eventStateList.includes(this.state.USstate)) {
        API.getEventsByLocation(this.state.USstate)
           .then((events) => {
              console.log("RETURNED EVENTS BASED ON LOCATION SEARCH");
              console.log(events.data);
              this.setState({events: events.data})
            }, (error) => {
              console.log(error);
              this.setState({error});
            })
      } else {
        this.displayAllEvents();
      }
    })
  }

  render() {
    const { error, isLoaded, events, indicators, controls, causes, featured } = this.state;

    console.log("State is?", this.state)

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Header />
          <Row style={{ marginTop: '40px', marginBottom: '40px' }}>


            {/* Cause Filters */}
            <Col md={2} style={{ marginLeft: '5vw', marginRight: '5vw' }}>
              <h2 style={{ marginBottom: '30px' }}>Filter by Cause</h2>
              <CauseDropdown causes={causes} handleCauseButtonClick={this.handleCauseButtonClick} />
              <CauseButtons
                causes={causes}
                handleCauseButtonClick={this.handleCauseButtonClick}
              />
            </Col>

            {/* Upcoming Events */}
            <Col md={8}>
              <Row>
                <Col md={12}>
                  <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Upcoming Events</h1>

                  {/* Controls container */}
                  <Controls className="filter-controls" {...this.state}
                    displayDateSelector={this.displayDateSelector}
                    handleDateChange={this.handleDateChange}
                    handleDateFocusChange={this.handleDateFocusChange}
                    handleDateSelection={this.handleDateSelection}
                    sortByLocation={this.sortByLocation}
                    displayAllEvents={this.displayAllEvents}
                    myEvents={this.myEvents}
                    sortByStates={this.state.events}
                    handleInputChange={this.handleInputChange}
                    eventStateList={this.state.eventStateList}
                  />
                </Col>
                  <Col md={12}>
                    <div>
                      {events.map((event) => {
                        return (
                          <EventCard
                            key={event._id}
                            data={event}
                            handleJoinEventButtonClick={this.handleJoinEventButtonClick}
                            userId={this.props.authData.user_id}
                          />
                        )
                      })}
                    </div>
                  </Col>

              </Row>
            </Col>
          </Row>
      </div>
      );
    }
  }
}

export default Home;
