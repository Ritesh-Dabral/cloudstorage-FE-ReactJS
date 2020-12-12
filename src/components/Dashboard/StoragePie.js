 /* Utility Modules*/
  import React,{useEffect,useState} from 'react'
  import {Card,Alert} from 'react-bootstrap'
  import axios from 'axios'


 /* Components */
  import Loading from '../AdditionalComponents/Loading';

export default function StoragePie({accessToken,show}) {

    const [freestorage,setfreestorage]     = useState(20);
    const [utilityStates,setUtilityStates] = useState({
        alert:'',
        variant:'',
        showAlert:false
    })
    const [loading,setLoading]             = useState(false);


    /**
     * Fetches the current user's storage value
     */
    const fetchStorage = ()=>{

        if(accessToken==='')
            return;

        
        const URL_PREFIX = process.env.REACT_APP_SERVER_URL_PREFIX;
        const URL = `${URL_PREFIX}/home/storagedet`;

        setLoading(true);

        axios.get(URL,{headers:{'authorization':`Token ${accessToken}`}})
            .then(response=>{

                setfreestorage(response.data.storage);
                setUtilityStates({alert:response.data.message,variant:'success',showAlert:true});

                // stop loading
                setLoading(false);

                let pieChart = document.getElementById('pieChart');
                pieChart.style.backgroundImage = `conic-gradient(lightblue ${freestorage}deg,pink 0)`;
            })
            .catch(error=>{
                const errMsg = error.response ? (error.response.data.errors.message):('Unknown Error Occured');

                setUtilityStates({
                    variant:'danger',
                    alert:errMsg,
                    showAlert:true
                });

                // stop loading
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchStorage();
    }, [show])

    return (
        <Card className="userInfoCards" style={{height:'20rem'}}>
            <Loading show={loading}/>
            <Alert 
                variant={utilityStates.variant} 
                id="fileAlert"
                show={utilityStates.showAlert}
                onClose={() => setUtilityStates({showAlert:false})} 
                dismissible
            >
                {utilityStates.alert}
            </Alert>

            <Card.Body>
                <div id="pieChart"></div>
            </Card.Body>
            <Card.Body>
                <div id="storageDetails">
                    <p>
                        <span id="freeLegend"></span>Free {freestorage.toFixed(2)}%
                    </p>
                    <p>
                        <span id="usedLegend"></span>Used {(100-freestorage).toFixed(2)}%
                    </p>
                </div>
            </Card.Body>
        </Card>
    )
}
