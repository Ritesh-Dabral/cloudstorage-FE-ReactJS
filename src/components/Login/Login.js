 /* Module Imports */
  import React, { Component } from 'react'
  import {Navbar,Jumbotron,Button,Card,Container,Form,Alert} from 'react-bootstrap'
  import {Link} from 'react-router-dom'
  import axios from 'axios'
  import {isEmail} from 'validator'
  import {withRouter} from 'react-router-dom'
 
 /* Css and Image imports */
  import './login.css'
  import LoginImage from '../../assets/images/login.png'
  import Loading from '../AdditionalComponents/Loading';


class Login extends Component {

    constructor(){
        super();

        this.state = {
            email:'',
            password:'',
            alert:'',
            variant:'light',
            loading:false
        }
    }


    componentDidMount(){
        let localStorageName = process.env.REACT_APP_LOCAL_NAME;
        let user = JSON.parse(localStorage.getItem(localStorageName));
        if(user){
            this.props.history.push('/dashboard');
            return;
        }
    }

    /**
     * 
     * @param {*} e : current input within form 
     */
    handleFormInputChange = (e)=>{
        const {id,value} = e.target;

        this.setState({
            ...this.state,
            [id] : value
        });

    }

    /**
     * Submits the form before sendind it in the backend
     */
    handleFormSubmit = async ()=>{
        // validate the inputs
        let areValidInputs = await this.validateInputs();

        if(!areValidInputs){
            return;
        }

        // if inputs are valid, 
        // 1. Show Loading Screen
        // 2. connect to server for logging in

        this.setState({
            ...this.state,
            loading:true
        })

        const URL_PREFIX = process.env.REACT_APP_SERVER_URL_PREFIX;
        const URL = `${URL_PREFIX}/auth/local/signin`;
        const {email,password} = this.state;

        axios.post(URL,{email,password})
            .then(response=>{

                const userObj={
                    token:response.data.token,
                    username:response.data.user.username,
                    profilePic:response.data.user.profile_image,
                    verified:response.data.user.verified
                }

                let localStorageName = process.env.REACT_APP_LOCAL_NAME
                localStorage.setItem(localStorageName,JSON.stringify(userObj));
                
                this.setState({
                    ...this.state,
                    loading:false
                });
                this.props.history.push('/dashboard');
            })
            .catch(error=>{
                const errMsg = error.response ? (error.response.data.errors.message):('Unknown Error Occured');

                this.setState({
                    ...this.state,
                    variant:'danger',
                    alert:errMsg,
                    loading:false
                })
            })

    }


    /**
     * validates the form input
     */
    validateInputs = async()=>{
        const {email,password} = this.state;

        if(email==='' || !isEmail(email)){
            this.setState({
                ...this.state,
                variant:'warning',
                alert:'Invalid email input'
            })

            return false;
        }
        else if(password==='' || password.length<8 ){
            this.setState({
                ...this.state,
                variant:'warning',
                alert:'Password must be greater than 8 characters'
            })

            return false;
        }

        return true;
    }


    render() {
        return (
            <Jumbotron id="loginDiv" fluid style={{padding:"0%", margin:"auto", width:"100%"}}>
                <Loading show={this.state.loading}/>
                <Navbar bg="info">
                    <Navbar.Brand><Link to="/" style={{color: "#f0f3f5"}} id="linkHover">KloudStorage</Link></Navbar.Brand>
                </Navbar>

                <Container id="loginContainer" fluid>
                    <Card id="loginCard">          
                        <Card.Title id="cardTitle">Log in and start uploading</Card.Title>
                        <Card.Img variant="top" src={LoginImage} />

                        <hr style={{margin:"5px 20px"}}/>
                        
                        <Alert variant={this.state.variant}
                            style={{margin: "0 5px",padding: "3px"}}
                        >
                            {this.state.alert}
                        </Alert>

                        <Card.Body>
                                    
                            <Form>
                                <Form.Group controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" 
                                    placeholder="johndoe@xyz.co" 
                                    value={this.state.email}
                                    onChange={this.handleFormInputChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" 
                                    placeholder="Password" 
                                    value={this.state.password}
                                    onChange={this.handleFormInputChange}
                                    />
                                </Form.Group>
                            </Form>

                            <Button variant="primary" id="submitBtn" onClick={this.handleFormSubmit}>Login</Button>
                            <br/><Link to="/" style={{fontSize: "0.7rem"}}>Forgot Password?</Link>
                        </Card.Body>

                        <hr style={{margin:"3px 10px"}}/>
                        <br/><span id="newUserSection2">New User?</span>
                        <br/><Button variant="primary" id="cr8Btn"><Link to="/signup" style={{color: "#f0f3f5"}} id="linkHover">Create Account</Link></Button>                        
                    </Card>
                </Container>
            </Jumbotron>
        )
    }
}


export default withRouter(Login);
