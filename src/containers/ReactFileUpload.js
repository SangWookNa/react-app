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
        
        this.setState({
            pictures: picture
        });
    }

    handleUpload = () => {
        const url = '/api/image/';
        const formData = new FormData();

        let file = this.state.pictures;
        console.log(file);
        formData.append('test', 'test');
        for(let i=0; i < file.length; i++ ){
            formData.append('file', file[i]);
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
                this.setState({
                    loadingFlag: true,
                    loadingValue: Math.round( (progressEvent.loaded * 100) / progressEvent.total )
                })
            }
        }
        return post(url, formData, config).then((result) => {
            
            if(result.data.success === true){
                alert('사진 등록이 완료되었습니다.');
                this.props.history.push('/');
            }else{
                alert('사진 등록을 실패하였습니다.');
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