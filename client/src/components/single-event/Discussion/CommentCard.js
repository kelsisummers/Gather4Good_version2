import React from "react";
import { Panel } from "react-bootstrap";



const CommentCard = (props) => {
    return (
        <div>
            <Panel>
                <Panel.Body>{props.body}</Panel.Body>
            </Panel>
        </div>
    )
}

export default CommentCard