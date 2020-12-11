
 /* Module Imports */
  import React,{useEffect} from 'react'
  import {Jumbotron,Button,Image,Carousel,Navbar,Card,Container} from 'react-bootstrap'
  import {Link} from 'react-router-dom'
  import { CaretDownFill } from 'react-bootstrap-icons';

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

    const showMore = ()=>{
        document.getElementById('whyUsContainer').style.display = "block";
        document.getElementById( 'whyUsContainer' ).scrollIntoView();
    }

    useEffect(()=>{
        let startDynamicHeader = setInterval( showHeader, 2000);
        return () => {
            clearInterval(startDynamicHeader);
        }
    },[])

    return (
        <>
            <Jumbotron id="jumbotronContainer">
                <Navbar bg="info" fixed="top">
                        <Navbar.Brand style={{color:"rgb(240, 243, 245)"}}>KloudStorage</Navbar.Brand>
                </Navbar>
                <h3 id="dynamicHeader">
                    Single destination for all your 
                    <span id="spanHeader">files</span>
                </h3>
                <Image src={CloudAnimation} fluid rounded className="homePageImage" />
                <h1 style={{fontFamily:"Source Sans Pro",margin:"10px auto"}}>Kloud Storage</h1>
                <p>
                    Need to store files and access them from anywhere?<br/>
                    Kloud Storage is the answer<br/>
                    Store your files and manage them from anywhere using our dashboard
                </p>
                <p>
                    <Button variant="success"><Link to="/login" style={{color: "#f0f3f5"}}>Join Us</Link></Button>
                </p>
                <CaretDownFill id="showMore" onClick={showMore}/>
            </Jumbotron>

            <Container fluid style={{zIndex:-5, display:"none"}} id="whyUsContainer">
                <h3 id="whyKloudStorage">Why choose us ?</h3>
                <span id="backDesign1"></span>
                <span id="backDesign2"></span>
                <Carousel>
                    <Carousel.Item interval={3000}>
                        <Card className="cardCarousal">
                            <Card.Img variant="top" src={FastImg} />
                            <Card.Body>
                                <Card.Title>Blazing fast speed</Card.Title>
                                <Card.Text>
                                    With the help of AWS services, KloudStorage is able to
                                    provide you with very fast access to your files. Get 
                                    access within blink of an eye (not really XD)
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                    
                    <Carousel.Item interval={3000}>
                        <Card className="cardCarousal">
                            <Card.Img variant="top" src={StorageImg} />
                            <Card.Body>
                                <Card.Title>Storage Worries You??</Card.Title>
                                <Card.Text>
                                KloudStorage allows you to store and access your data
                                from anywhere around the globe. Manage your uploads easily
                                with our curated UI designs.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>

                    <Carousel.Item interval={3000}>
                        <Card className="cardCarousal">
                            <Card.Img variant="top" src={SafeImg} />
                            <Card.Body>
                                <Card.Title>Yes, safety first!!</Card.Title>
                                <Card.Text>
                                    Data safety and user privacy is our top most priority.
                                    KloudStorage helps you store and retrieve your files securely
                                    and easily.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                    
                </Carousel>
            </Container>
        </>
    )
}

export default Homepage

