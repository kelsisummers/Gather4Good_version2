import React from "react";
import { Panel, Button, Glyphicon } from "react-bootstrap";

const style = {
    float: "right"
}

const CommentCard = (props) => {
    return (
        <div>
            <Panel>
                <Panel.Body>{props.body}
                    <br/>
                    <div>
                        <small>{props.author}</small>
                        <Button style={style} onClick={props.deleteCommentButton} id={props.id} authorid={props.authorid} bsStyle="danger" bsSize="xsmall"><Glyphicon glyph="erase" className="glyphicon" /></Button>
                    </div>
                </Panel.Body>
            </Panel>
        </div>
    )
}

export default CommentCard