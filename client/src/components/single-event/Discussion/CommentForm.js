import React from "react";

const style = {
  backgroundColor: "#00b9b4",
  border: "none",
  borderRadius: "2px"
}

const CommentForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleCommentFormSubmit}>
                <p className='discussion-placeholder'>Type new comment below:</p>
                <input value={props.commentFormInputValue} id="input" placeholder='Someone want to carpool?' onChange={props.handleCommentInputChange}></input>
                <button id="comment-submit-btn" style={style} className='btn btn-success' type="submit">Submit Comment</button>
            </form>
        </div>
    )
}

export default CommentForm
