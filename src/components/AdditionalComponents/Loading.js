import React,{useEffect} from 'react'
import LoadingCloud from '../../assets/images/loadingCloud.gif'
import {Jumbotron,Image} from 'react-bootstrap'

import './additionalComp.css'


export default function Loading({show}){

    useEffect(()=>{
        if(show){
            document.getElementById('loadingCloudContainer').style.display = "block";
        }
        else{
            document.getElementById('loadingCloudContainer').style.display = "none";
        }
    },[show])

    return (
        <Jumbotron id="loadingCloudContainer" style={{display:"none"}}>
            <Image src={LoadingCloud}  alt="loading cloud" id="loadingCloudImg" fluid rounded/>
        </Jumbotron>
    )
}
