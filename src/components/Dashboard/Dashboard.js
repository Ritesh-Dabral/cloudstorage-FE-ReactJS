 /* Module Imports */
  import React, { Component } from 'react'
  import {Col,Row,Navbar,Jumbotron,Collapse} from 'react-bootstrap'
  import {withRouter} from 'react-router-dom'
  import {PersonSquare,PlusCircleFill} from 'react-bootstrap-icons'

 /* Css and Image imports */
 import './dashboard.css'

 
 
 /* Other Components */
 import StoragePie from './StoragePie'
 import ProfileCard from './ProfileCard'
 import AllFiles from './AllFiles';


 const initialState = {
    username:'',
    storage:0,
    profilePic:'',
    accessToken:'',
    usedStorage:0,
    open:false,
 }

class Dashboard extends Component {

    constructor(){
        super();
        this.state={
            ...initialState
        }
    }

    /**
     * As soon as the component loads, put the 
     * local storage details
     * into the state if available, else redirect to 
     * login route
     */
    async componentDidMount(){
        let localStorageName = process.env.REACT_APP_LOCAL_NAME;
        let user = JSON.parse(localStorage.getItem(localStorageName));
        if(!user){
            this.props.history.push('/login');
            return;
        }

        let free = (user.storage/20);

        this.setState({
            ...this.state,
            username:user.username,
            storage:user.storage,
            accessToken:user.token,
            profilePic:(user.profilePic)?(user.profilePic):process.env.REACT_APP_PROFILE_PIC,
            usedStorage:free*100
        })

        // setting up pie chart
        free=free*360;
        let pieChart = document.getElementById('pieChart');
        pieChart.style.backgroundImage = `conic-gradient(lightblue ${free}deg,pink 0)`;
    }



    /**
     * 
     * @param {*} variantType : variant type (primary,warn,success...etc)
     * @param {*} alertMsg : actual message
     * @param {*} set : true or false for setting or removing
     */
    setUnsetAlert = (variantType='light',alertMsg='',set=true)=>{
        if(set){
            this.setState({
                ...this.state,
                variant:variantType,
                alert:alertMsg,
                alertView:true
            })
        }
        else{
            this.setState({
                ...this.state,
                variant:'light',
                alert:'',
                alertView:false
            })           
        }
    }
    /**
     * When the user will logout or anything as such, then this will be used
     */
    componentWillUnmount(){
        this.setState({
            ...initialState
        })
    }

    render() {
        return (
            <Jumbotron fluid id="dashboardContainer">

                <Navbar expand="lg" bg="info">
                    <Navbar.Brand>KloudStorage</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <PlusCircleFill/>
                        <PersonSquare
                            onClick={() => this.setState({...this.state,open: !this['state']['open']})}
                            style={{cursor:"pointer"}}
                        />
                    </Navbar.Collapse>
                </Navbar>

                <Collapse in={this.state.open}>
                    <Row style={{padding: "5px 3px"}}>
                        <Col id="profileView" xs={12} sm={6} md={6}>
                            <ProfileCard 
                            profilePicSrc={this.state.profilePic} 
                            username={this.state.username}
                            />
                        </Col>
                        <Col id="storageView" xs={12} sm={6} md={6}>
                            <StoragePie storage={this.state.usedStorage}/>
                        </Col>
                    </Row>
                </Collapse>

                <div id="fileViewContainer">
                    <AllFiles accessToken={this.state.accessToken}/>
                </div>

            </Jumbotron>
        )
    }
}


export default withRouter(Dashboard);