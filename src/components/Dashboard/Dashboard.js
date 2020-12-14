 /* Module Imports */
  import React, { Component } from 'react'
  import {Col,Row,Navbar,Jumbotron,Tabs,Tab} from 'react-bootstrap'
  import {withRouter} from 'react-router-dom'
  import {Power} from 'react-bootstrap-icons'

 /* Css and Image imports */
 import './dashboard.css'

 
 
 /* Other Components */
 import StoragePie from './StoragePie'
 import ProfileCard from './ProfileCard'
 import AllFiles from './AllFiles';
 import AddFiles from './AddFiles'


 const initialState = {
    username:'',
    profilePic:'',
    accessToken:'',
    open:false,
    refresh:false,
    verified:false
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


        this.setState({
            ...this.state,
            username:user.username,
            accessToken:user.token,
            profilePic:(user.profilePic)?(user.profilePic):process.env.REACT_APP_PROFILE_PIC,
            refresh:true,
            verified:user.verified
        })
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


    /**
     * 
     * @param {*} val : boolean to set whether allFiles component should update 
     */
    shouldAllFilesRefresh = (val=false)=>{
        this.setState({...this.state,refresh:val});
    }


    handleLogout = ()=>{
        localStorage.clear();
        this.props.history.push('/');
    }


    render() {
        return (
        <>
            <Jumbotron fluid id="dashboardContainer">

                <Navbar expand="lg" style={{background: 'none'}}>
                    <Navbar.Brand style={{color:"#ebfff8",fontSize: "xx-large"}}>
                        KloudStorage
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Power id="logoutBtn" onClick={this.handleLogout}/>

                    </Navbar.Collapse>
                </Navbar>




                <Tabs defaultActiveKey="allfiles">

                    <Tab eventKey="allfiles" title="My Files" >
                        <div id="fileViewContainer">
                            <AllFiles 
                                accessToken={this.state.accessToken} 
                                show={this.state.refresh} 
                                refreshFilesFunc={this.shouldAllFilesRefresh} 
                                currShowAllFiles={this.state.refresh}
                            />
                        </div>
                    </Tab>

                    <Tab eventKey="addfiles" title="Add" id="addFilesTab">
                        <Row id="userFilesAdd" style={{backgroundColor:"#2d68bf85"}}>
                            <AddFiles 
                                refreshFilesFunc={this.shouldAllFilesRefresh} 
                                currShowAllFiles={this.state.refresh}
                                accessToken={this.state.accessToken}
                            />
                        </Row>
                    </Tab>

                    <Tab eventKey="viewprofile" title="Profile" id="viewProfileTab">    
                        <Row id="userProfile">
                            <Col id="profileView" xs={12} sm={12} md={12} lg={12} xl={12}>
                                <ProfileCard 
                                    profilePicSrc={this.state.profilePic} 
                                    username={this.state.username}
                                    accessToken={this.state.accessToken}
                                    verified={this.state.verified}
                                />
                            </Col>
                            <Col id="storageView" xs={12} sm={12} md={12} lg={12} xl={12}>
                                <StoragePie accessToken={this.state.accessToken} show={this.state.refresh}/>
                            </Col>
                        </Row>
                    </Tab>
                </Tabs>


            </Jumbotron>
        </>
        )
    }
}


export default withRouter(Dashboard);