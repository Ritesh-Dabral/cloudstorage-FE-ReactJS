 /* Module Imports */
  import React, { Component } from 'react'
  import {Navbar,Jumbotron,Button,Card,Container,Col,Row,Form} from 'react-bootstrap'
  import {Link} from 'react-router-dom'
 
 /* Css and Image imports */
  import './login.css'
  import LoginImage from '../../assets/images/login.png'
class Login extends Component {

    render() {
        return (
            <Jumbotron id="loginDiv">
                <Navbar bg="info" fixed="top">
                    <Navbar.Brand><Link to="/" style={{color: "#f0f3f5"}} id="linkHover">KloudStorage</Link></Navbar.Brand>
                </Navbar>

                <Container id="loginContainer" fluid>
                    <Card id="loginCard">
                        
                        <Card.Title id="cardTitle">Log in and start uploading</Card.Title>
                        <Card.Img variant="top" src={LoginImage} />

                        <hr style={{margin:"5px 20px"}}/>

                        <Card.Body>
                            
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="johndoe@xyz.co" />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                            </Form>

                            <Button variant="primary" id="submitBtn">Login</Button>
                            <br/><Link to="/" style={{fontSize: "0.7rem"}}>Forgot Password?</Link>
                        </Card.Body>

                        <hr style={{margin:"3px 10px"}}/>
                        <br/><span id="newUserSection2">New User?</span>
                        <br/><Button variant="primary" id="cr8Btn">Create Account</Button>                        
                    </Card>
                </Container>
            </Jumbotron>
        )
    }
}


export default Login;
