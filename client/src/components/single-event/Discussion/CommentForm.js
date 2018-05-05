import React from "react";

const CommentForm = (props) => {
    return (
        <div>
            <form onSubmit={props.newComment}>
                <p className='discussion-placeholder'>Type new comment below:</p>
                <input id="input" placeholder='Someone want to carpool?'></input>
                <button className='btn btn-success' type="submit">Submit Comment</button>
            </form>
        </div>
    )
}

export default CommentForm