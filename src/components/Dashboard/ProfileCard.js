 
 
 /* Utility Modules*/
    import React,{useState} from 'react'
    import {Card,Alert,Button} from 'react-bootstrap'
    import axios from 'axios'

 /* Components */   
    import Loading from '../AdditionalComponents/Loading';


function ProfileCard({profilePicSrc,username,accessToken,verified}) {

    const [utilityStates,setUtilityStates] = useState({alert:'',variant:'',showAlert:false})
    const [loading,setLoading]             = useState(false);

    const handleResendVerificationMail = ()=>{

        if(accessToken==='')
            return;

        setLoading(true);
        
        const URL_PREFIX = process.env.REACT_APP_SERVER_URL_PREFIX;
        const URL = `${URL_PREFIX}/home/resendverifmail`;

        axios.post(URL,{},{headers:{'authorization':`Token ${accessToken}`}})
            .then(response=>{
                setUtilityStates({alert:response.data.message,variant:'success',showAlert:true});
                // stop loading
                setLoading(false);
            })
            .catch(error=>{
                const errMsg = error.response ? (error.response.data.errors.message):('Unknown Error Occured');
                setUtilityStates({variant:'danger',alert:errMsg,showAlert:true});
                // stop loading
                setLoading(false);
            })
    }


    return (
        <Card className="userInfoCards" style={{height:'auto'}}>

            <Loading show={loading}/>
            <Alert 
                variant={utilityStates.variant} 
                id="fileAlert"
                show={utilityStates.showAlert}
                onClose={() => setUtilityStates({showAlert:false})} 
                style={{textAlign:'center'}}
                dismissible
            >
                {utilityStates.alert}
            </Alert>

            <Card.Img variant="top" src={profilePicSrc} 
                id="userProfilePic"
            />
            <Card.Body>
                <Card.Text>
                    "{username}"
                </Card.Text>
                {
                    verified ? (
                        <Card.Text style={{color:'green'}}>
                           Verified User
                        </Card.Text>
                    ):(
                        <Button variant="info" onClick={handleResendVerificationMail}>Resend Verification Mail</Button>
                    )
                }
            </Card.Body>
        </Card>
    )
}

export default ProfileCard
