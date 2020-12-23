 import React,{useState} from 'react'
 import axios from 'axios'
 import { GoogleLogin } from 'react-google-login';
 import {useHistory} from 'react-router-dom';


 import Loading from './Loading';

function GoogleOAuth({displayText,showChildErrors}) {

    const [showLoading,setShowLoading] = useState(false);

    const history = useHistory();
    /**
     * Google authentication
     * 
     * @param {*} response 
     */
    const responseSuccessGoogle = (response)=>{
        const profile = {
            "email":response['profileObj']['email'],
            "username":response['profileObj']['name'],
            "profile_image":response['profileObj']['imageUrl']
        }

        setShowLoading(true);

        const URL_PREFIX = process.env.REACT_APP_SERVER_URL_PREFIX;
        const URL = `${URL_PREFIX}/auth/google/access`;

        axios.post(URL,{profile})
            .then(response=>{
                const userObj={
                    token:response.data.token,
                    username:response.data.user.username,
                    profilePic:response.data.user.profile_image,
                    verified:response.data.user.verified
                }

                let localStorageName = process.env.REACT_APP_LOCAL_NAME
                localStorage.setItem(localStorageName,JSON.stringify(userObj));
                
                setShowLoading(false);
                history.push('/dashboard');

            })
            .catch(error=>{
                const errMsg = error.response.data ? (error.response.data.errors.message) : ('Unknown error occured');
                showChildErrors(errMsg);
                setShowLoading(false);
            })
    }

    const responseFailureGoogle = (error)=>{
        showChildErrors('Google authentication failed');
    }


    return (
        <div className="google-btn">
            <Loading show={showLoading}/>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText={displayText}
                onSuccess={responseSuccessGoogle}
                onFailure={responseFailureGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleOAuth
