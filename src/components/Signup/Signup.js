 /* Module Imports */
 import React, { Component } from 'react'
 import {Navbar,Jumbotron,Button,Card,Container,Form,Alert} from 'react-bootstrap'
 import {Link} from 'react-router-dom'
 import axios from 'axios'
 import {isEmail} from 'validator'
 import {withRouter} from 'react-router-dom'

/* Css and Image imports */
 import './signup.css'
 import SignupImage from '../../assets/images/signup.jpg'
 import Loading from '../AdditionalComponents/Loading';
 import GoogleOAuth from '../AdditionalComponents/GoogleOAuth'

class Signup extends Component {

   constructor(){
       super();

       this.state = {
           email:'',
           password:'',
           username:'',
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
       const URL = `${URL_PREFIX}/auth/local/signup`;
       const {email,password,username} = this.state;

       axios.post(URL,{email,password,username})
           .then(response=>{

                const userObj={
                    token:response.data.token,
                    username:response.data.user.username,
                    profilePic:response.data.user.profile_image,
                    verified:response.data.user.verified
                }

               let localStorageName = process.env.REACT_APP_LOCAL_NAME;
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
       const {email,password,username} = this.state;
        
       if(email==='' || !isEmail(email.trim().toLowerCase())){
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
       else if(username==='' || username.trim().length<3 ){
            this.setState({
                ...this.state,
                variant:'warning',
                alert:'Username must be cool and greater than 2 characters'
            })

            return false;
        }

       return true;
   }


   showChildErrors=(err)=>{
        this.setState({
            ...this.state,
            variant:'danger',
            alert: err ? err : 'Unknown Error Occured'
        })
    }

   render() {
       return (
           <Jumbotron id="signupDiv" fluid style={{padding:"0%", margin:"auto", width:"100%"}}>
               <Loading show={this.state.loading}/>
               <Navbar style={{backgroundColor:"#218750"}}>
                   <Navbar.Brand><Link to="/" style={{color: "#f0f3f5"}} id="linkHover">KloudStorage</Link></Navbar.Brand>
               </Navbar>

               <Container id="loginContainer" fluid>
                   <Card id="loginCard">          
                       <Card.Title id="signUpCardTitle">Sign up to use KloudStorage</Card.Title>
                       <Card.Img variant="top" src={SignupImage} style={{padding: "0 5px",borderRadius: "8px"}}/>

                       <hr style={{margin:"5px 20px"}}/>
                       
                       <GoogleOAuth 
                            displayText="Sign up with google"
                            showChildErrors = {this.showChildErrors}
                        />

                        <hr style={{margin:"5px 20px"}}/>
                       
                       <Alert variant={this.state.variant}
                            style={{margin: "0 5px",padding: "3px",textAlign:'center',overflowWrap: 'break-word'}}
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

                               <Form.Group controlId="username">
                                   <Form.Label>Username</Form.Label>
                                   <Form.Control type="text" 
                                   placeholder="hotpursuit" 
                                   value={this.state.username}
                                   onChange={this.handleFormInputChange}
                                   />
                               </Form.Group>
                           </Form>

                           <Button variant="primary" id="submitBtn" onClick={this.handleFormSubmit}>
                               SignUp
                            </Button>

                           <br/><Link to="/" style={{fontSize: "0.7rem"}}>T&C</Link>
                       </Card.Body>

                       <hr style={{margin:"3px 10px"}}/>
                       <br/><span id="newUserSection2">Old User?</span>
                       <br/>
                       <Button variant="primary" id="getInBtn">
                           <Link to="/login" style={{color: "#f0f3f5"}} id="linkHover">Sign In</Link>
                        </Button>                        
                   </Card>
               </Container>
           </Jumbotron>
       )
   }
}


export default withRouter(Signup);
