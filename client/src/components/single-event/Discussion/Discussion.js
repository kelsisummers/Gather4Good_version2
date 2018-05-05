import React, {Component } from "react";
import CommentCard from "./CommentCard.js";
import CommentForm from "./CommentForm.js";
import { Panel } from 'react-bootstrap';

class Discussion extends Component {
    state = {
        comments: this.props.data
        // will grab "this.props.comments" and setState to current comments.
    }

    newComment(event) {
        event.preventDefault();
        // logic to post a comment to the database, then pull the update list, update state,
        // and re-render the comments list.
    }

    render() {
        return (
            <div>
                <Panel className='z-depth-2 discussion-container'>
                  <Panel.Heading className='discussion-header'>Discussion Thread</Panel.Heading>
                  <Panel.Body>
                  <CommentForm
                    newComment = {this.newComment}
                />
                                <br/>
                {this.state.comments.map(comment => {
                    return (
                        <CommentCard
                            key={comment.id}
                            title={comment.body}
                        />
                    )
                })}
                  </Panel.Body>
  </Panel>


            </div>
        )
    }
}

export default Discussion;