 /* Utility Modules*/
  import React,{useState,useEffect} from 'react'
  import {Jumbotron,Alert,Card,Col,Row} from 'react-bootstrap'
  import axios from 'axios'


 /* Components */
  import Loading from '../AdditionalComponents/Loading';
  import EachFileOptions from './EachFileOptions';

 /*extra import*/
  import ApplicationType from '../../assets/images/allFiles/application.jpg'
  import AudioType from '../../assets/images/allFiles/audio.png'
  import DocumentType from '../../assets/images/allFiles/document.jpg'
  import ImageType from '../../assets/images/allFiles/image.jpg'
  import VideoType from '../../assets/images/allFiles/video.jpg'
  import AddFiles from '../../assets/images/allFiles/add.jpg'

function AllFiles({accessToken,show,refreshFilesFunc,currShowAllFiles}) {

    const [myFiles,setMyFiles]             = useState([]);
    const [utilityStates,setUtilityStates] = useState({
        alert:'',
        variant:'light',
        showAlert:false
    })
    const [loading,setLoading]              = useState(false);


    /**
     * Get all the files
     */
    const fetchFiles=()=>{
        if(accessToken==='')
            return;
        //loading icon
        setLoading(true);

        const url = `${process.env.REACT_APP_SERVER_URL_PREFIX}/files/allfiles`;


        // fetch files
        axios.get(url,{headers:{authorization: `Token ${accessToken}`}})
            .then(response=>{
                setMyFiles([...response.data.files]);
                setUtilityStates({alert:response.data.message,variant:'success'});
                setLoading(false);
                
            })
            .catch(error=>{
                const errMsg = error.response ? (error.response.data.errors.message):('Unknown Error Occured');
                setUtilityStates({alert:errMsg,variant:'danger'});
                setLoading(false);
            })
    }


    /**
     * Fetch files as soon as component
     * loads or updates
     */
    useEffect(()=>{
        fetchFiles();
    },[show])


    /**
     * 
     * @param {*} contentType : type of content 
     * 
     */
    const checkMimeType = (contentType)=>{
        var type = contentType.split('/')[0];
        var subType = contentType.split('/')[1];

        if(type==='image')
            return ImageType;
        else if(type==='text')
            return DocumentType;
        else if(type==='audio')
            return AudioType;
        else if(type==='video')
            return VideoType;
        else{
            if(subType==='pdf'||subType==='json'||subType==='csv'||subType.includes('word'))
                return DocumentType;
            else
                return ApplicationType
        }
            
    }

    const showEachFileMessage = (alertMsg,variantType)=>{
        setUtilityStates({alert:alertMsg,variant:variantType});
    } 

    const setURL = (eleID='',URL='')=>{
        document.getElementById(`${eleID}`).value = URL;
    }

    return (
        <Jumbotron id="filesView">
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

            <Row>
            {
                myFiles.length ? (
                    myFiles.map(file=>{
                        return (
                        <Col key={file._id} xs={8} sm={6} md={6} lg={4} xl={3} id="colCards" style={{margin:"auto"}}>
                            
                            <Card className="myFilesCard">
                                <div id="moreOptionsBtn">
                                    <EachFileOptions 
                                        fileKey={file.fileKey}
                                        ACL={file.ACL}
                                        accessToken={accessToken}
                                        sendResMsg={showEachFileMessage}
                                        setURL={setURL}
                                        fileId={file._id}
                                        refreshFilesFunc={refreshFilesFunc}
                                        currShowAllFiles={currShowAllFiles}
                                    />
                                </div>
                                <Card.Img variant="top" src={checkMimeType(file.contentType)} 
                                    style={{width:'160px',margin:'0 auto'}}
                                />
                                <Card.Body style={{margin:'2px auto',padding:'0%'}}>
                                    <Card.Title className="cardTitle">{file.originalname}</Card.Title>
                                </Card.Body>
                                <input 
                                    id={file._id} 
                                    style={{marginTop:"10px",scrollBehavior:"smooth",overflowX:"scroll"}}
                                    value={(file.ACL==='private')?('URL Private'):(file.url)}
                                    readOnly
                                    className="cardURLInputField"
                                />
                            </Card>

                        </Col>)
                    })
                ):(
                    <Card id="noFilesFound">
                        <Card.Img variant="top" src={AddFiles} />
                        <Card.Body>
                            <Card.Title>Add Files</Card.Title>
                            <Card.Text>
                                Add files to view them
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )
            }
            </Row>
        </Jumbotron>
    )
}

export default AllFiles
