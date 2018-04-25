import React, {Component } from "react";
import CommentCard from "./CommentCard.js";
import CommentForm from "./CommentForm.js";


export class Discussion extends Component {
    state = {
        comments: [{ id: 1, body: "Comment 1"}, { id: 2, body: "Comment 2" }]
        // will grab "this.props.comments" and setState to current comments.
    }

    newComment(event) {
        event.preventDefault();
        // logic to post a comment to the database, then pull the update list, update state,
        // and re-render the comments list.
    }

    render() {
        return (
            <div className="boxes">
                <h2>Discussion</h2>
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
            </div>
        )
    }
}