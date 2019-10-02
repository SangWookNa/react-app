import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import VideoPlayer from '../components/video/VideoPlayer';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
import { connect } from 'react-redux';
import * as value from './../globals';

const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: '10px',
    },
    button: {
        marginTop: '10px',
    },
    input: {
        display: 'none',
    },
    card: {
        maxWidth: 700,
        marginBottom: '10px',
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
            filePath: '',
            disabled: false,
            checkedB: false,
        };
    }

    handleInputChange = (e) => {
        this.setState({
            invitee: e.target.value,
        });
    }

    onDrop = (selectorFiles) => {

        const formData = new FormData();
        let file = selectorFiles;
        let id = this.props.status.info.userid;
        let username = this.props.status.info.nickname;

        formData.append('enterid', id);
        formData.append('username', username);
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

        return axios.post('/api/video/', formData, config).then((result) => {

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

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });

    };

    handleUpload = (e) => {

        if(this.state.checkedB){
            this.upload_withVideo();
        }else{
            this.upload();
        }
    }

    upload_withVideo = (e) => {
        let invitee = this.state.invitee;
        let username = this.props.status.info.nickname;
        let enterid = this.props.status.info.userid;
        let files = this.state.files;

        if (files.length === 0) {
            alert("영상을 등록해주세요~");
            return;
        }
        this.setState({
            disabled: true,
        })

        return axios.post('/api/video/save', { username, enterid, invitee, files }).then((result) => {

            let invitee = result.data.result.invitee;
            let seq = result.data.result._id;
            let enterid = result.data.result.enterid;
            let celebrateUrl = '';
            let title = '';
            let description = '';

            if (invitee === '' || invitee === null || invitee === undefined || invitee === 'undefined') {
                celebrateUrl = `${window.location.origin}/Home/${enterid}/${seq}`;
                title = '결혼식에 초대합니다.';

            } else {
                celebrateUrl = `${window.location.origin}/Home/${enterid}/${invitee}/${seq}`;
                title = `To. ${invitee}`;
                description = '결혼식에 초대합니다.';
            }

            const token = this.props.status.info.access_token;
            const data = {
                "object_type": "feed",
                "content": {
                    "title": title,
                    "description": description,
                    "image_url": this.props.images[0].src,
                    "image_width": 640,
                    "image_height": 640,
                    "link": {
                        "web_url": celebrateUrl,
                        "mobile_web_url": celebrateUrl,
                        "android_execution_params": "contentId=100",
                        "ios_execution_params": "contentId=100"
                    }
                },
                "buttons": [
                    {
                        "title": "청첩장 열어보기",
                        "link": {
                            "web_url": celebrateUrl,
                            "mobile_web_url": celebrateUrl
                        }
                    },
                ]
            };

            return axios.post('/api/kakao/send', { token, data }).then((result) => {
                console.log(result.data);
                //window.location.href = url;
                if (result.data.code === -402) {
                    alert('카카오톡 메시지 전송여부에 동의하셔야합니다. 동의 후 청첩장을 다시 제작해주세요.');
                    const required_scopes = result.data.required_scopes;
                    const url = `${value.KAKAO_LOGIN_URL}?client_id=${value.KAKAO_CLIENT_ID}&redirect_uri=${value.KAKAO_REDIRECT_URL}&response_type=code&scope=${required_scopes.join(',')}`;
                    window.location.href = url;
                } else {
                    alert('청첩장 제작이 완료되었습니다. 카카오톡 > 나와의 채팅방에서 제작된 청첩장을 확인하세요!');
                    window.location.href = window.location.origin;
                }
                this.setState({
                    disabled: false,
                })
            }).catch((error) => {
                // handle error
                alert(error);
                this.setState({
                    disabled: false,
                })
            })
        }).catch((error) => {
            // handle error
            alert(error);
            this.setState({
                disabled: false,
            })
        })
    }

    upload = (e) => {
        let enterid = this.props.status.info.userid;

        this.setState({
            disabled: true,
        })

        let celebrateUrl = '';
        let title = '';
        let description = '';

        celebrateUrl = `${window.location.origin}/Home/${enterid}`;
        title = '결혼식에 초대합니다.';

        const token = this.props.status.info.access_token;
        const data = {
            "object_type": "feed",
            "content": {
                "title": title,
                "description": description,
                "image_url": this.props.images[0].src,
                "image_width": 640,
                "image_height": 640,
                "link": {
                    "web_url": celebrateUrl,
                    "mobile_web_url": celebrateUrl,
                    "android_execution_params": "contentId=100",
                    "ios_execution_params": "contentId=100"
                }
            },
            "buttons": [
                {
                    "title": "청첩장 열어보기",
                    "link": {
                        "web_url": celebrateUrl,
                        "mobile_web_url": celebrateUrl
                    }
                },
            ]
        };

        return axios.post('/api/kakao/send', { token, data }).then((result) => {
            console.log(result.data);
            //window.location.href = url;
            if (result.data.code === -402) {
                alert('카카오톡 메시지 전송여부에 동의하셔야합니다. 동의 후 청첩장을 다시 제작해주세요.');
                const required_scopes = result.data.required_scopes;
                const url = `${value.KAKAO_LOGIN_URL}?client_id=${value.KAKAO_CLIENT_ID}&redirect_uri=${value.KAKAO_REDIRECT_URL}&response_type=code&scope=${required_scopes.join(',')}`;
                window.location.href = url;
            } else {
                alert('청첩장 제작이 완료되었습니다. 카카오톡 > 나만의 채팅방에서 제작된 청첩장을 확인하세요!');
                window.location.href = window.location.origin;
            }
            this.setState({
                disabled: false,
            })
        }).catch((error) => {
            // handle error
            alert(error);
            this.setState({
                disabled: false,
            })
        })
    }

    render() {

        const loading = (<CircularProgress variant="static" value={this.state.loadingValue} />);
        const { classes } = this.props;

        const videoPlayer = (
            <CardContent>
                <Typography component="p">
                    <VideoPlayer url={this.state.filePath} />
                </Typography>
            </CardContent>
        );
        const videoForm = (
            <div>
                <input
                    accept="video/*"
                    id="contained-button-file"
                    className={classes.input}
                    onChange={(e) => this.onDrop(e.target.files)}
                    type="file"
                />
                <Card className={classes.card}>
                    <label htmlFor="contained-button-file">
                        <CardActionArea variant="contained" component="span" >
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="Recipe" className={classes.avatar}>
                                        3
                                    </Avatar>
                                }
                                title="초대 영상 등록"
                                subheader="초대영상을 등록해주세요."
                            />
                            {this.state.files.length > 0 ? videoPlayer : undefined}
                        </CardActionArea>
                    </label>
                </Card>
                <Grid item xs={12}>
                    <TextField
                        id="invitee"
                        name="invitee"
                        label="초대받는분 이름"
                        fullWidth
                        value={this.state.invitee}
                        variant="outlined"
                        onChange={this.handleInputChange}
                    />
                </Grid>
            </div>
        )

        return (
            <div className={classes.root}>
                <Grid container justify="flex-end">
                    <FormControlLabel
                        value="start"
                        control={<Switch
                            checked={this.state.checkedB}
                            onChange={this.handleChange('checkedB')}
                            value="checkedB"
                            color="primary"
                        />}
                        label="초대영상등록하기"
                        labelPlacement="start"
                    />
                </Grid>
                {this.state.checkedB === true ? videoForm : undefined}
                <Grid item xs={12}>
                    <Button variant="contained"
                        onClick={this.handleUpload}
                        color="primary"
                        fullWidth
                        className={classes.button}
                        disabled={this.state.disabled}
                        size="large" >
                        만들기
                    </Button>
                </Grid>
                {this.state.loadingFlag === true ? loading : undefined}
            </div>



        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.kakao.status,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(VideoUpload));
