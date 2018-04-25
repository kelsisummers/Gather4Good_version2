import React from "react";

const CommentForm = (props) => {
    return (
        <div>
            <form onSubmit={props.newComment}>
                <label>Type new comment below:</label>
                <input id="input"></input>
                <button type="submit">Submit Comment</button>
            </form>
        </div>
    )
}

export default CommentForm