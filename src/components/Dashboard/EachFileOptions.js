 /* Utility Modules*/
 import React,{useState,useEffect} from 'react'
 import {Dropdown} from 'react-bootstrap'
 import {ThreeDotsVertical} from 'react-bootstrap-icons'

/* Components */
 import Loading from '../AdditionalComponents/Loading';

/*extra import*/

function EachFileOptions() {
    return (
        <div className="fileOptions">
            <ThreeDotsVertical style={{cursor:'pointer'}}/>
        </div>
    )
}

export default EachFileOptions
