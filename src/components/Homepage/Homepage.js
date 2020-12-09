
 /* Module Imports */
  import React,{useEffect} from 'react'
  import {Jumbotron,Button,Image,Carousel} from 'react-bootstrap'
  import {Link} from 'react-router-dom'

 /* Css and Image imports */
  import './Homepage.css'
  import CloudAnimation from '../../assets/images/CloudAnimation.gif'
  import FastImg from '../../assets/images/fast.jpg'
  import SafeImg from '../../assets/images/safe.jpg'
  import StorageImg from '../../assets/images/storage.jpg'

function Homepage() {

    let start = 0;
    const headerTag = ['uploads','management','downloads','files'];
    
    function showHeader() {
        start = start%4;
        document.getElementById('spanHeader').innerText = headerTag[start].toLowerCase();
        start = start+1;
    }

    useEffect(()=>{
        let startDynamicHeader = setInterval( showHeader, 2000);
        return () => {
            clearInterval(startDynamicHeader);
        }
    },[])

    return (
        <>
            <Jumbotron style={{textAlign:"center", fontFamily:"Montserrat"}}>
                <h3 style={{letterSpacing:"3px"}}>Single destination for all your <span id="spanHeader">files</span></h3>
                <Image src={CloudAnimation} fluid rounded className="homePageImage" />
                <h1 style={{fontFamily:"Source Sans Pro"}}>Kloud Storage</h1>
                <p>
                    Need to store files and access them from anywhere?<br/>
                    Kloud Storage is the answer<br/>
                    Store your files and manage them from anywhere using our dashboard
                </p>
                <p>
                    <Button variant="success"><Link to="/login" style={{color: "#f0f3f5"}}>Join Us</Link></Button>
                </p>
            </Jumbotron>

            <hr style={{margin: "0 5%"}}/>

            <Carousel>
                <Carousel.Item>
                    <Image src={FastImg} fluid rounded className="slideImage" 
                    alt="First slide" 
                    />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                
                <Carousel.Item>
                    <Image src={StorageImg} fluid rounded className="slideImage" 
                    alt="Second slide" 
                    />
                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <Image src={SafeImg} fluid rounded className="slideImage" 
                    alt="Third slide" 
                    />
                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                
            </Carousel>
        </>
    )
}

export default Homepage

