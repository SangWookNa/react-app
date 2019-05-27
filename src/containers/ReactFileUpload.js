import React from 'react';
import ImageUploader from 'react-images-upload';
import Button from '@material-ui/core/Button';
import { post } from 'axios';

class ReactFileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }
    
    onDrop(picture) {
        console.log(picture);
        this.setState({
            pictures: picture
        });
    }

    handleUpload = () => {
        const url = 'http://localhost:3000/api/image';
        const formData = new FormData();

        let file = this.state.pictures;
        formData.append('file', file);
        formData.append('test', 'test');
        for(let i=0; i < file.length; i++ ){
            formData.append('file', file[i]);
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config).then((result) => {
            
            if(result.data.success === true){
                 this.setState({
                     pictures : []
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
        return (
            <div>
                <ImageUploader
                    label=''
                    withIcon={false}
                    buttonText='upload'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    withPreview = {true}
                />
                <Button onClick={this.handleUpload}>Upload</Button>
            </div>
        );
    }
}

export default ReactFileUpload;