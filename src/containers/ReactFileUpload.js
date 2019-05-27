import React from 'react';
import ImageUploader from 'react-images-upload';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { post } from 'axios';

class ReactFileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = { pictures: [],
                        loadingFlag: false,
                        loadingValue: 0
         
        };
        this.onDrop = this.onDrop.bind(this);
    }
    
    onDrop(picture) {
        console.log(picture);
        this.setState({
            pictures: picture
        });
    }

    handleUpload = () => {
        const url = 'http://192.168.0.6:3000/api/image';
        const formData = new FormData();

        let file = this.state.pictures;

        formData.append('test', 'test');
        for(let i=0; i < file.length; i++ ){
            formData.append('file', file[i]);
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
                //alert('test: '+Math.round( (progressEvent.loaded * 100) / progressEvent.total ));
                this.setState({
                    loadingFlag: true,
                    loadingValue: Math.round( (progressEvent.loaded * 100) / progressEvent.total )
                })
            }
        }
        return post(url, formData, config).then((result) => {
            
            if(result.data.success === true){
                 this.setState({
                     pictures : [],
                     loadingFlag: false,
                     loadingValue:0
                 });
                 formData.delete('file');
                
            }else{
                alert(result.data.error);
            }
        }).catch((error)=>{
        // handle error
        alert(error.response.data.error.message);
        
        })
    }

    render() {
        
        const loading = (<CircularProgress variant="static" value={this.state.loadingValue} />);
        return (
            <div>
                <ImageUploader
                    label=''
                    withIcon={false}
                    buttonText='upload'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                    maxFileSize={5242880}
                    withPreview = {true}
                />
                <Button onClick={this.handleUpload}>Upload</Button>
                {this.state.loadingFlag === true ? loading : undefined}
            </div>
            
        );
    }
}

export default ReactFileUpload;