import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import blue from '@material-ui/core/colors/blue';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {
    getStatusRequest,
  } from '../actions/kakao';
import { connect } from 'react-redux';
import {
    userinfoPostRequest,
    userinfoGetRequest,
} from '../actions/userinfo';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 20
    },
    button: {
        margin: theme.spacing(1),
        float: 'right'
    },
    input: {
        display: 'none',
    },
    card: {
        minWidth: 275,
    },
    title: {
        fontSize: 20,
    },
    input1: {
        height: 15
    },
    address1: {
        fontSize: 15,
    },
    address2: {
        fontSize: 13,
    },
    subheader: {
        fontSize: 13,
    },
    pos: {
        marginBottom: 5,
        fontSize: 13,
    },
    header: {
        height: 0,
        paddingTop: '13.25%', // 16:9
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    text: {
        paddingTop: '10',
        paddingLeft: '200',
        paddingRight: '10',
    },
});

class MapUpload extends React.Component {
    constructor(props) {
        super(props);
        this.groomInput = React.createRef();
        this.brideInput = React.createRef();
        this.marryDateTimeInput = React.createRef();
        this.searchValueInput = React.createRef();
        this.addressName2Input = React.createRef();
    }

    state = {
        searchValue: '',
        addressName: '',
        roadAddressName: '',
        placeName: '',
        phone: '지도위 마커를 눌러주세요',
        x: '',
        y: '',
        addressName2: '',
        marryDateTime: '',
        bride: '',
        groom: '',
        userid: '',
    }

    componentDidMount() {

        //////////////세션체크//////////////
        //쿠키 가져오기
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length === 2) return parts.pop().split(";").shift();
        }
        //get loginData from cookie
        let loginData = getCookie('key');

        //decode base64 & parse json
        loginData = JSON.parse(atob(loginData));
        
        //세션가져오기
        //page refreshed & has a session in cookie,
        //check whether this cookie is valid or not
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

                }
            }
        );
        ///////////////////////////////////

        this.setState({
            userid: loginData.userid,
        })

        //데이터 셋팅
        this.dataSetting(loginData.userid);

        //지도표시
        window.mapContainer = document.getElementById('map'); // 지도를 표시할 div 
        window.mapOption = {
            center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };
        window.map = new window.kakao.maps.Map(window.mapContainer, window.mapOption); //지도 생성 및 객체 리턴

        // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
        window.infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    }

    //데이터 불러오기
    dataSetting = (userid) => {
        let id = userid;

        //유저정보 불러오기
        this.props.userinfoGetRequest(id).then(() => {
            console.log(this.props.userData);
            if (this.props.userData.status === 'SUCCESS') {
                if (this.props.userData.data !== null) {
                    //console.log(format(this.props.userData.data.marry_date_time,'yyyy-mm-dd'));
                    this.setState({
                        searchValue: this.props.userData.data.place_name,
                        addressName: this.props.userData.data.address_name,
                        roadAddressName: this.props.userData.data.road_address_name,
                        placeName: this.props.userData.data.place_name,
                        phone: this.props.userData.data.place_phone,
                        x: this.props.userData.data.x,
                        y: this.props.userData.data.y,
                        addressName2: this.props.userData.data.address_name2,
                        marryDateTime: this.props.userData.data.marry_date_time,
                        bride: this.props.userData.data.bride,
                        groom: this.props.userData.data.groom,
                    })
                    // 이동할 위도 경도 위치를 생성합니다 
                    var moveLatLon = new window.kakao.maps.LatLng(this.props.userData.data.y, this.props.userData.data.x);

                    // 지도 중심을 이동 시킵니다
                    window.map.setCenter(moveLatLon);

                    // 마커가 표시될 위치입니다 
                    var markerPosition = new window.kakao.maps.LatLng(this.props.userData.data.y, this.props.userData.data.x);

                    // 마커를 생성합니다
                    var marker = new window.kakao.maps.Marker({
                        position: markerPosition
                    });

                    // 마커가 지도 위에 표시되도록 설정합니다
                    marker.setMap(window.map);


                }



            } else {
                alert("사용자정보불러오기 실패");
            }
        });
    }

    handleSearch = () => {
        window.infowindow.close();

        this.setState({
            addressName: '',
            roadAddressName: '',
            placeName: '',
            phone: '지도위 마커를 눌러주세요',
            x: '',
            y: '',
            addressName2: '',
        });

        // 장소 검색 객체를 생성합니다
        var ps = new window.kakao.maps.services.Places();

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        // 키워드로 장소를 검색합니다
        ps.keywordSearch(this.state.searchValue, this.placesSearchCB);

        // 지도 위에 표시되고 있는 마커를 모두 제거합니다
        function removeMarker() {

            for (var i = 0; i < window.markers.length; i++) {
                window.markers[i].setMap(null);
            }
            window.markers = [];
        }

    }
    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    placesSearchCB = (data, status, pagination) => {
        if (status === window.kakao.maps.services.Status.OK) {

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            var bounds = new window.kakao.maps.LatLngBounds();
            if (data.length === 1) {
                console.log(data[0]);

                this.setState({
                    addressName: data[0].address_name,
                    roadAddressName: data[0].road_address_name,
                    placeName: data[0].place_name,
                    phone: data[0].phone,
                    x: data[0].x,
                    y: data[0].y
                });
            }
            for (var i = 0; i < data.length; i++) {
                this.displayMarker(data[i]);
                bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
            }

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            window.map.setBounds(bounds);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {

            alert('검색 결과가 존재하지 않습니다.');
            return;

        } else if (status === window.kakao.maps.services.Status.ERROR) {

            alert('검색 결과 중 오류가 발생했습니다.');
            return;

        }
    }

    // 지도에 마커를 표시하는 함수입니다
    displayMarker = (place) => {
        console.log(place);

        var marker = new window.kakao.maps.Marker();

        // 마커를 생성하고 지도에 표시합니다
        marker = new window.kakao.maps.Marker({
            map: window.map,
            position: new window.kakao.maps.LatLng(place.y, place.x)
        });

        window.markers.push(marker);

        // 마커에 클릭이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, 'click', () => {
            console.log(place);
            this.setState({
                addressName: place.address_name,
                roadAddressName: place.road_address_name,
                placeName: place.place_name,
                phone: place.phone,
                x: place.x,
                y: place.y
            })

            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            window.infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            window.infowindow.open(window.map, marker);
        });
    }

    handleChange = (e) => {

        let nextState = {};
        nextState[e.target.name] = e.target.value;

        this.setState(
            nextState
        );
    }

    handleKeyPress = (e) => {
        if (e.charCode === 13) {
            this.handleSearch();
        }
    }

    handlePost = (e) => {
        console.log(this.state);
        let groom = this.state.groom.trim();
        let bride = this.state.bride.trim();
        let marryDateTime = this.state.marryDateTime.trim();
        let searchValue = this.state.searchValue.trim();
        let addressName2 = this.state.addressName2.trim();

        if (groom === '') {
            this.groomInput.current.focus();
            alert('새신랑 이름을 입력하세요.');
            return;
        }
        if (bride === '') {
            this.brideInput.current.focus();
            alert('새신부 이름을 입력하세요.');
            return;
        }
        if (marryDateTime === '') {
            this.marryDateTimeInput.current.focus();
            alert('결혼식 일시를 입력하세요.');
            return;
        }
        if (searchValue === '') {
            alert('예식장 이름(주소)를 입력하세요.');
            this.searchValueInput.current.focus();
            return;
        }
        if (addressName2 === '') {
            alert('상세 주소를 입력하세요.');
            console.log(this.addressName2Input.current);
            if (this.addressName2Input.current !== null) {
                this.addressName2Input.current.focus();
            }
            return;
        }

        this.props.userinfoPostRequest(this.state).then(
            () => {
                if (this.props.postStatus.status === "SUCCESS") {
                    alert('예식정보 등록에 성공하였습니다.');
                    window.location.href = window.location.origin + '/Main';
                } else {
                    alert(this.props.postStatus.error);
                    if (this.props.postStatus.error === 1) {
                        alert("계정정보가 없습니다. 로그인페이지로 이동합니다.");
                        window.location.href = window.location.origin;
                    } else {
                        alert('실패');
                    }

                }
            }
        )
    }

    handleCancel = (e) => {
        this.props.history.push('/Main');
    }

    render() {
        const { classes } = this.props;

        const cardContent = (
            <CardContent>
                <Typography className={classes.address1} >
                    {this.state.roadAddressName}
                </Typography>
                <Typography className={classes.address2} color="textSecondary" >
                    {this.state.addressName}
                </Typography>
                <TextField
                    id="addressName2"
                    name="addressName2"
                    className={classes.pos}
                    label="상세 위치"
                    placeholder="ex) 4층 파티움 홀"
                    multiline
                    fullWidth
                    inputRef={this.addressName2Input}
                    value={this.state.addressName2}
                    onChange={this.handleChange}
                    margin="normal"
                    
                />
            </CardContent>
        );

        return (
            <div style={{ marginTop: '10px' }}>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Typography gutterBottom>
                            1. 예식정보관리
                </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="groom"
                            name="groom"
                            label="신랑 이름"
                            fullWidth
                            InputProps={{ classes: { input: classes.input1 } }}
                            margin="normal"
                            inputRef={this.groomInput}
                            value={this.state.groom}
                           
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="bride"
                            name="bride"
                            label="신부 이름"
                            fullWidth
                            InputProps={{ classes: { input: classes.input1 } }}
                            margin="normal"
                            inputRef={this.brideInput}
                            value={this.state.bride}
                            
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="marryDateTime"
                            name="marryDateTime"
                            label="백년가약 맺는날"
                            type="datetime-local"
                            fullWidth
                            value={this.state.marryDateTime}
                            inputRef={this.marryDateTimeInput}
                            onChange={this.handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ marginBottom: '10px', marginTop: '20px' }}>
                            <TextField
                                id="searchValue"
                                name="searchValue"
                                inputRef={this.searchValueInput}
                                label="예식장 이름(주소) 입력"
                                style={{ width: '73%' }}
                                value={this.state.searchValue}
                                
                                onChange={this.handleChange}
                                onKeyPress={this.handleKeyPress}
                            />
                            <Button  onClick={this.handleSearch} color="primary" className={classes.button} size="small" component="span" >
                                search
                    </Button>
                        </div>
                        <div id="map" style={{ width: '88%', height: '230px', margin: 'auto', backgroundColor: 'gray' }}></div>
                        <div className={classes.root}>

                            <Card className={classes.card}>
                                <CardHeader className={classes.header} classes={{ title: classes.title, subheader: classes.subheader }}
                                    title={this.state.placeName}
                                    subheader={this.state.phone}
                                />
                                {this.state.addressName !== '' ? cardContent : undefined}
                            </Card>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Button 
                            onClick={this.handlePost}
                            color="primary"
                            fullWidth
                            size="large" >
                            저장
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button 
                            onClick={this.handleCancel}
                            color="primary"
                            fullWidth
                            size="large" >
                            취소
                    </Button>
                    </Grid>
                </Grid>


            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        postStatus: state.userinfo.post,
        userData: state.userinfo.get,
        status: state.kakao.status,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userinfoPostRequest: (data) => {
            return dispatch(userinfoPostRequest(data));
        },
        userinfoGetRequest: (userid) => {
            return dispatch(userinfoGetRequest(userid));
        },
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MapUpload));