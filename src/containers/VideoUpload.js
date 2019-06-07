import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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
            filePath : ''
        };
    }

    handleInputChange = (e) => {
        this.setState({
            invitee: e.target.value,
        });
    }

    // handleUpload = (e) => {
    //     const url = '/api/video/';
    //     const formData = new FormData();
    //     let file = this.state.videoFiles;

    //     formData.append('username', 'test');
    //     formData.append('invitee', this.state.invitee);
    //     for (let i = 0; i < file.length; i++) {
    //         console.log(file[i]);
    //         formData.append('file', file[i]);
    //     }

    //     const config = {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         },
    //         onUploadProgress: progressEvent => {
    //             this.setState({
    //                 loadingFlag: true,
    //                 loadingValue: Math.round((progressEvent.loaded * 100) / progressEvent.total)
    //             })
    //         }
    //     }
    //     let username = 'test';
    //     let invitee = this.state.invitee;

    //     return axios.post(`${url}delete`, { username, invitee }).then((result) => {

    //         return axios.post(url, formData, config).then((result) => {

    //             if (result.data.success === true) {
    //                 alert('영상 등록이 완료되었습니다.');
    //                 this.props.history.push('/');
    //             } else {
    //                 alert('영상 등록을 실패하였습니다.');
    //             }
    //         }).catch((error) => {
    //             // handle error
    //             alert(error);

    //         })

    //     }).catch((error) => {
    //         // handle error
    //         alert(error);

    //     })

    // }

    handleUpload = (e) => {
        

    }

    onDrop = (selectorFiles) => {       

        const url = '/api/video/';
        const formData = new FormData();
        let file = selectorFiles;

        formData.append('username', 'test');
        formData.append('invitee', this.state.invitee);
        for (let i = 0; i < file.length; i++) {
            console.log(file[i]);
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
            alert(result.data.filePath);
            this.setState({
                filePath : result.data.filePath,
                loadingFlag: false,
            })

        }).catch((error) => {
            // handle error
            alert(error);

        })
    }

    render() {

        const loading = (<CircularProgress variant="static" value={this.state.loadingValue} />);
        const { classes } = this.props;
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