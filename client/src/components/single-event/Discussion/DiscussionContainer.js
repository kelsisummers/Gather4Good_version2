import React, { Component } from "react";
import Discussion from "./Discussion.js";
import API from "../../../utils/API.js";
const axios = require("axios");

export class DiscussionContainer extends Component {
    state = {
        error: null,
        isLoaded: false,
        comments: []
    };

    // Once Container mounts, sends request to server to retrieve comments, updates state, and renders Discussion with the data.
    componentDidMount() {
        console.log(this.props.data._id)
        // passes "this.props.id" to API.getEvent as arg.
        API.getCommentsByEvent(this.props.data._id)
            .then((comments) => {
                console.log(comments.data);
                this.setState({
                    isLoaded: true,
                    comments: comments.data
                });
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, comments } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Discussion
                    data={this.state.comments}
                />
            );
        }
    }
}

