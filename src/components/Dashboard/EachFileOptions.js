 /* Utility Modules*/
  import React,{useState} from 'react'
  import {DropdownButton,Dropdown} from 'react-bootstrap'
  import axios from 'axios'


 /* Components */
  import Loading from '../AdditionalComponents/Loading';


/*extra import*/

function EachFileOptions({fileKey,ACL,accessToken,sendResMsg,setURL,fileId,currShowAllFiles,refreshFilesFunc}) {

    const [loading,setLoading]     = useState(false);


    /**
     * On or Off Sharable mode
     */
    const toggleSharable = ()=>{
        const URL_PREFIX = process.env.REACT_APP_SERVER_URL_PREFIX;
        const URL = `${URL_PREFIX}/files/shareable`;

        let obj ={
            fileKey,
            shareable: (ACL==='private')?(true):(false)
        }
        
        setLoading(true);
        // start loading
        axios.post(URL,obj,{headers:{authorization: `Token ${accessToken}`}})
            .then(response=>{
                if(response.data.data==='Private Access Only'){
                    setURL(fileId,'');
                }
                else{
                    setURL(fileId,response.data.data);
                }

                let succmsg = `${fileKey} made `;
                let made = (ACL==='private')?('public'):('private');
                succmsg = succmsg + made;

                sendResMsg(succmsg,'info');

                setLoading(false);
                refreshFilesFunc(!currShowAllFiles);
            })
            .catch(error=>{
                const errMsg = error.response ? (error.response.data.errors.message):('Unknown Error Occured');
                sendResMsg(errMsg,'danger');
                setLoading(false);
            })
    }


    /**
     * Initialize download
     */
    const handleDownloadRequest = ()=>{

        const URL_PREFIX = process.env.REACT_APP_SERVER_URL_PREFIX;
        const URL = `${URL_PREFIX}/files/download`;

        setLoading(true);
        // start loading
 
        let fileId = fileKey.split('/')[0];
        let newFileKey = fileKey.split('/')[1];
        axios.post(URL,{"fileId":fileId,"fileKey":newFileKey},{
            headers:{
                authorization: `Token ${accessToken}`
            },
            responseType:'blob'
        })
            .then(response=>{
                const data = response.data;
                const url = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = url;
                let file = fileKey.split('/');
                let newName = '';
                for(let i=1;i<file.length;i++){
                    newName+=file[i];
                }
                file = file.join(' ');
                let ext = file[file.length-1];

                link.setAttribute('download', `${newName}.${ext}`);
                document.body.appendChild(link);
                link.click();

                setLoading(false);

                sendResMsg(`Download request ${fileKey}`,'info');

            })
            .catch(error=>{
                const errMsg = error.response.data.errors ? (error.response.data.errors.message):('Unknown Error Occured');
                sendResMsg(errMsg,'danger');
                setLoading(false);
            })
    }


    /**
     * handles file deletion
     */
    const handleDeleteRequest = ()=>{
        const URL_PREFIX = process.env.REACT_APP_SERVER_URL_PREFIX;
        const URL = `${URL_PREFIX}/files/delete`;

        // loading starts
        setLoading(true);

        axios.post(URL,{"fileKey":fileKey},{
            headers:{
                authorization: `Token ${accessToken}`
            }
        })
            .then(response=>{
                sendResMsg(`${fileKey} ${response.data.msg}`,'warning');
                setLoading(false);
                refreshFilesFunc(!currShowAllFiles);
            })
            .catch(error=>{
                const errMsg = error.response ? (error.response.data.errors.message):('Unknown Error Occured');
                sendResMsg(errMsg,'danger');
                setLoading(false);
            })

    }

    return (
        <div className="fileOptions">
            <Loading show={loading}/>

            <DropdownButton title='' variant="warning">
                    <Dropdown.Item onClick={toggleSharable}>
                        {
                            (ACL!=='private')?('Make private'):('Make public')
                        }
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleDownloadRequest}>Download</Dropdown.Item>
                    <Dropdown.Item onClick={handleDeleteRequest}>Delete</Dropdown.Item>
            </DropdownButton>

        </div>
    )
}

export default EachFileOptions
