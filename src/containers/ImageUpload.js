import React from 'react';
import ImageUploader from 'react-images-upload';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

class ImageUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            loadingFlag: false,
            loadingValue: 0

        };
        this.onDrop = this.onDrop.bind(this);
        //this.handleUpload = this.handleUpload.bind(this);
    }

    onDrop(picture) {

        this.setState({
            pictures: picture
        });
    }

    handleUpload = (e) => {
        const url = '/api/image/';
        const formData = new FormData();

        let file = this.state.pictures;
        
        formData.append('username', 'test');
        formData.append('uploadFlag', e.target.id);
        console.log(formData);
        for (let i = 0; i < file.length; i++) {
            formData.append('file', file[i]);
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
                this.setState({
                    loadingFlag: true,
                    loadingValue: Math.round((progressEvent.loaded * 100) / progressEvent.total)
                })
            }
        }

        return axios.delete(`/api/image/${'test'}/${e.target.id}`, formData, config).then((result) => {
            
            return axios.post(url, formData, config).then((result) => {

                if (result.data.success === true) {
                    alert('사진 등록이 완료되었습니다.');
                    this.props.history.push('/');
                } else {
                    alert('사진 등록을 실패하였습니다.');
                }
            }).catch((error) => {
                // handle error
                alert(error);
    
            })

        }).catch((error) => {
            // handle error
            alert(error);

        })
        
    }

    render() {

        const loading = (<CircularProgress variant="static" value={this.state.loadingValue} />);
        return (
            <div>
                <ImageUploader
                    label='사진을 업로드 해주세요'
                    withIcon={false}
                    buttonText='upload'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                    maxFileSize={5242880}
                    withPreview={true}
                />
                <Button  onClick={this.handleUpload} ><p id='gallery'>Upload(Gallery)</p></Button>
                <Button  onClick={this.handleUpload} ><p id='grid'>Upload(Grid)</p></Button>
                {this.state.loadingFlag === true ? loading : undefined}
            </div>

        );
    }
}

export default ImageUpload;