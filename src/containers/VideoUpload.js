import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import VideoPlayer from '../components/video/VideoPlayer';
import axios from 'axios';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class VideoUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingFlag: false,
            loadingValue: 0,
            videoFiles: [{ name: "영상을 업로드 해주세요" }],
            invitee: '',
            files: [],
            filePath: ''
        };
    }

    handleInputChange = (e) => {
        this.setState({
            invitee: e.target.value,
        });
    }

    onDrop = (selectorFiles) => {

        const url = '/api/video/';
        const formData = new FormData();
        let file = selectorFiles;

        formData.append('username', 'test');
        formData.append('invitee', this.state.invitee);
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

        return axios.post(url, formData, config).then((result) => {
            
            this.setState({
                files: result.data.files,
                filePath: result.data.files[0].path,
                loadingFlag: false,
            })

        }).catch((error) => {
            // handle error
            alert(error);
        })
    }

    handleUpload = (e) => {
        const url = '/api/video/save';

        let invitee = this.state.invitee;
        let username = 'test';
        let files = this.state.files;

        // if (invitee === '' || invitee === null || invitee === undefined) {
        //     alert("초대받는분의 이름을 입력해주세요~");
        //     return;
        // }
        if (files.length === 0) {
            alert("영상을 등록해주세요~");
            return;
        }

        return axios.post(url, { username, invitee, files }).then((result) => {
            
            alert('영상 등록이 완료되었습니다.');
            let username = result.data.result.username;
            let invitee = result.data.result.invitee;
            let seq = result.data.result._id;
            
            if(invitee === '' || invitee === null || invitee === undefined || invitee === 'undefined') {
                this.props.history.push(`/${username}/${seq}`);
            }else{
                this.props.history.push(`/${username}/${invitee}/${seq}`);
            }
            
                           

        }).catch((error) => {
            // handle error
            alert(error);

        })

    }



    render() {

        const loading = (<CircularProgress variant="static" value={this.state.loadingValue} />);
        const { classes } = this.props;

        const videoPlayer = (
            <VideoPlayer url={this.state.filePath} />
        );
        return (
            <div>
                <input
                    accept="video/*"
                    id="contained-button-file"
                    className={classes.input}
                    onChange={(e) => this.onDrop(e.target.files)}
                    type="file"
                />
                <Typography variant="h6">
                    {this.state.videoFiles[0].name}
                </Typography>
                <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span" className={classes.button}>
                        Upload
                    </Button>
                </label>

                {this.state.files.length > 0 ? videoPlayer : undefined}
                <TextField
                    id="invitee"
                    name="invitee"
                    label="name"
                    fullWidth
                    margin="normal"
                    value={this.state.invitee}
                    variant="outlined"
                    onChange={this.handleInputChange}
                />
                <br />
                <Button onClick={this.handleUpload} ><p id='gallery'>Upload(video)</p></Button>
                {this.state.loadingFlag === true ? loading : undefined}
            </div>

        );
    }
}

export default withStyles(styles)(VideoUpload);