import React from "react";
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap'

export const CauseDropdown = (props) => { 
    return (
      <div>
      <ButtonToolbar style={{width: '80vw'}}>
      <DropdownButton
        className='cause-dropdown'
        title="Select A Cause"
        id="dropdown-size-large"
      >
        {props.causes.map((cause, i) => {
            return (
                
                <MenuItem eventKey={i} key={i} causeid={cause._id} onClick={props.handleCauseButtonClick} style={{width:"80vw"}}>{cause.name}</MenuItem>
            )
        })
      }
      </DropdownButton>
    </ButtonToolbar>
    </div>

    )
} 
