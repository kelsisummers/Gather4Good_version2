import React, {Component } from "react";
import CommentCard from "./CommentCard.js";
import CommentForm from "./CommentForm.js";
import { Panel } from 'react-bootstrap';

export const Discussion = (props) => {
    console.log(props.data.comments);
    return (
        <div>
            <Panel className='z-depth-2 discussion-container'>
                <Panel.Heading className='discussion-header'>Discussion Thread</Panel.Heading>
                <Panel.Body>
                    <CommentForm {...props} />
                    <br />
                    {props.data.comments.map((comment, i) => {
                        return (
                            <CommentCard
                                key={i}
                                body={comment.body}
                            />
                        )
                    })}
                </Panel.Body>
            </Panel>
        </div>
    )
}
