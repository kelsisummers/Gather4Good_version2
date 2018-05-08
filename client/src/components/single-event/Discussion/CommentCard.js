import React from "react";
import { Panel, Button, Glyphicon } from "react-bootstrap";

const style = {
    float: "right",
    textAlign: "center"
}

const CommentCard = (props) => {
    return (
        <div>
            <Panel>
                <Panel.Body>{props.body}
                    <br/>
                    <div>
                        <small>{props.author}</small>
                        <Button style={style} onClick={props.deleteCommentButton} id={props.id} authorid={props.authorid}  bsSize="xsmall"><Glyphicon style={{color: 'red', marginRight: 0}} glyph="remove" className="glyphicon" /></Button>
                    </div>
                </Panel.Body>
            </Panel>
        </div>
    )
}

export default CommentCard
