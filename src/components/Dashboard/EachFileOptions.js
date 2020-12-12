 /* Utility Modules*/
 import React from 'react'
 import {Dropdown} from 'react-bootstrap'

/* Components */

/*extra import*/

function EachFileOptions({fileKey}) {
    return (
        <div className="fileOptions">

            <Dropdown>
                <Dropdown.Toggle variant="info">
                </Dropdown.Toggle>

                <Dropdown.Menu show={false}>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default EachFileOptions
