import React from 'react';
import ImageUploader from 'react-images-upload';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { Gallery, ImageGridList } from '../components/image/';
import Typography from '@material-ui/core/Typography';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import Divider from '@material-ui/core/Divider';
import { BrowserRouter as Link, NavLink } from "react-router-dom";
import axios from 'axios';
import {
    getStatusRequest,
} from '../actions/kakao';
import {
    imageGalleryListRequest,
    imageGridListRequest,
    imageMainRequest,
} from '../actions/image';
import {
    Invitation,
} from './';
import { connect } from 'react-redux';

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            loadingFlag: false,
            loadingValue: 0,
            currentImage: 0,
            imageMainData: [{ src: "http://mud-kage.kakao.co.kr/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg" }],
            imagesGalleryData: [],
            imagesGridData: [{ src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599", width: 1, height: 1 }],
            thumbnailImages: [{ src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599", width: 1, height: 1 }],
            disabled : false,

        };
        this.onDrop = this.onDrop.bind(this);
        //this.handleUpload = this.handleUpload.bind(this);
    }
    componentDidMount() {
        //세션가져오기
        this.props.getStatusRequest().then(
            () => {
                if (!this.props.status.valid) {
                    //logout the session
                    let loginData = {
                        isLoggedIn: false,
                        userid: '',
                    };
                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                    alert("세션정보가 없습니다. 로그인페이지로 이동합니다.");
                    window.location.href = window.location.origin;
                    return;

                } else {
                    //데이터 셋팅
                    this.dataSetting(this.props.status.info.userid);
                }
            }
        );


    }

    //데이터 불러오기
    dataSetting = (id) => {

        const origin = window.location.origin;

        //사진불러오기(메인)
        this.props.imageMainRequest(id, 'main').then(() => {
                const images = this.props.imageMainData.map((data) => {
                    let obj = {};
                    obj.src = `${origin}/${data.path}`;
                    return obj;
                });

                if (images.length > 0) {
                    this.setState({
                        imageMainData: images,
                    });
                }
            }
        );

        //사진불러오기(갤러리)
        this.props.imageGalleryListRequest(id, 'gallery').then(() => {
                const images = this.props.imageGalleryData.map((data) => {
                    let obj = {};
                    obj.original = `${origin}/${data.path}`;
                    obj.thumbnail = `${origin}/${data.thumbnailpath}`;

                    return obj;
                });

                this.setState({
                    imagesGalleryData: images,
                });
            }
        );

        //사진불러오기(그리드)
        this.props.imageGridListRequest(id, 'gallery').then(
            () => {

                const images = this.props.imageGridData.map((data) => {
                    let obj = {};
                    obj.src = `${origin}/${data.path}`;
                    obj.width = 1;
                    obj.height = 1;
                    return obj;
                });

                const thumbnailImages = this.props.imageGridData.map((data) => {
                    let obj = {};
                    obj.src = `${origin}/${data.thumbnailpath}`;
                    obj.width = 4;
                    obj.height = 4;
                    obj.style = { borderRadius: '20px', margin: 10, cursor: 'pointer' };
                    return obj;
                });

                if (images.length > 0) {
                    this.setState({
                        imagesGridData: images,
                        thumbnailImages: thumbnailImages,
                    });
                }
            }
        );
    }

    onDrop(picture) {

        this.setState({
            pictures: picture
        });
    }

    handleUpload = (uploadFlag) => {

        const formData = new FormData();
        
        let file = this.state.pictures;
        let id = this.props.status.info.userid;
        let username = this.props.status.info.nickname;

        formData.append('enterid', id);
        formData.append('username', username);
        formData.append('uploadFlag', uploadFlag);

        if ( file.length === 0) {
            alert('사진을 업로드 해주세요.');
            return;
        }

        if (uploadFlag === 'main' && file.length > 1) {
            alert('메인사진은 1장만 업로드가 가능합니다.');
            return;
        }

        this.setState({
            disabled : true,
        })

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

        return axios.delete(`/api/image/${id}/${uploadFlag}`, formData, config).then(() => {

            return axios.post('/api/image/', formData, config).then((result) => {

                if (result.data.success === true) {
                    alert('사진 등록이 완료되었습니다.');
                    window.location.reload();
                } else {
                    alert('사진 등록을 실패하였습니다.');
                }

                this.setState({
                    disabled : false,
                })
            }).catch((error) => {
                // handle error
                alert(error);
                this.setState({
                    disabled : false,
                })
            })

        }).catch((error) => {
            // handle error
            alert(error);
            this.setState({
                disabled : false,
            })

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
                <Grid container spacing={8} >
                    <Grid item xs={6}>
                        <Button variant="contained"
                            color="primary"
                            fullWidth
                            disabled={this.state.disabled}
                            onClick={() => this.handleUpload('main')}
                            size="small" >
                            메인사진등록(1장)
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained"
                            color="primary"
                            fullWidth
                            disabled={this.state.disabled}
                            onClick={() => this.handleUpload('gallery')}
                            size="small" >
                            사진첩등록(여러장)
                        </Button>
                    </Grid>
                    {/*<Grid item xs={4}>
                        <Button variant="contained"
                            onClick={this.handleUpload}
                            color="primary"
                            fullWidth
                            size="small" >
                            <p id='grid'>Upload(Grid)</p>
                        </Button>
                    </Grid> */}

                </Grid>
                {this.state.loadingFlag === true ? loading : undefined}
                <div style ={{marginTop:70,marginBottom:70}}>
                <Divider />
                <Typography component="h2" variant="display1" style={{ paddingLeft: '2%',paddingBottom: '5%' }}>
                    <LibraryBooks /> main
                </Typography>
                <Invitation images={this.state.imageMainData} />
                {/* <Gallery images={this.state.imagesGalleryData} /> */}
                <ImageGridList
                    images={this.state.imagesGridData}
                    thumbnailImages={this.state.thumbnailImages} />
                </div>
                <Grid item xs={12}>
                    <NavLink to="/Main" style={{color: 'inherit', textDecoration: 'none'}}>
                        <Button variant="contained"
                            color="primary"
                            fullWidth
                            size="small" >
                            확인 (뒤로가기)
                        </Button>
                    </NavLink>
                    </Grid>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.kakao.status,
        imageGridData: state.image.gridList.data,
        imageMainData: state.image.mainList.data,
        imageGalleryData: state.image.galleryList.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        imageGalleryListRequest: (enterid, uploadFlag) => {
            return dispatch(imageGalleryListRequest(enterid, uploadFlag))
        },
        imageGridListRequest: (enterid, uploadFlag) => {
            return dispatch(imageGridListRequest(enterid, uploadFlag))
        },
        imageMainRequest: (enterid, uploadFlag) => {
            return dispatch(imageMainRequest(enterid, uploadFlag))
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);