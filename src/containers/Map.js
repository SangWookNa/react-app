import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import tmapLogo from './../image/tmap_logo.jpg';
import kakaoNaviLogo from './../image/kakaonavi_btn_medium.png';
import Paper from '@material-ui/core/Paper';
import * as value from '../globals';
// import {
//     Weather,
// } from './';
const styles = theme => ({
    cont: {
        marginTop: 100,
        marginBottom: 100,
    },
    root: {
        flexGrow: 1,
        marginTop: 20
    },
    paper_root: {
        paddingTop: '5%',
        paddingBottom: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    card: {
        minWidth: 275,
    },
    title: {
        fontSize: 20,
    },
    address1: {
        fontSize: 15,
        paddingBottom: '2%',
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
        paddingBottom: '2%',
    },
    pos2: {
        marginBottom: 5,
        fontSize: 10,
        paddingBottom: '2%',
    },
    header: {
        height: 0,
        paddingTop: '13.25%', // 16:9
    },
    text: {
        paddingTop: '10',
        paddingLeft: '200',
        paddingRight: '10',
    },
    logo: {
        marginTop: 1,

    },
});

class Map extends React.Component {

    componentDidMount() {

        window.Kakao.init(value.KAKAO_MAP_KEY);
    }
    handleClick_navigation = (e) => {

        if (e.target.id === 'tmap') {
            const url = `${value.TMAP_NAVIGATION_URL}/tmap/app/routes?appKey=${value.TMAP_APP_KEY}&name=${this.props.userData.data.place_name}&lon=${this.props.userData.data.x}&lat=${this.props.userData.data.y}`;
            //window.open(url, "a");
            window.location.href = url;
        } else if (e.target.id === 'kakao') {

            let x = this.props.userData.data.x;
            let y = this.props.userData.data.y;

            x = Number.parseFloat(x);
            y = Number.parseFloat(y);

            window.Kakao.Navi.start({
                name: this.props.userData.data.place_name,
                x: x,
                y: y,
                coordType: 'wgs84'
            });

        } else if (e.target.id === 'naver') {

        }

    }

    render() {
        const { classes } = this.props;
        // const weather = (<Weather weather={this.props.weather} />);
        return (

            <div className={classes.cont}>
                <Typography variant="h4"  style={{ paddingLeft: '1%',paddingBottom: '3%' }}>
                    <DirectionsCar /> map
                </Typography>
                <Grid >
                    <div className={classes.root}>
                        <Card className={classes.card} elevation={3}>
                            {/* {this.props.dayDiff === 0 ? weather : undefined}   */}
                            <div id="map" style={{ width: '88%', height: '230px', margin: 'auto', marginTop: 20, backgroundColor: 'gray' }}></div>
                            <CardHeader className={classes.header} classes={{ title: classes.title, subheader: classes.subheader }}
                                title={this.props.userData.data.place_name}
                                subheader={this.props.userData.data.place_phone}
                            />
                            <CardContent>
                                <TextField
                                    label="도로명주소"
                                    className={classes.pos}
                                    multiline
                                    fullWidth
                                    defaultValue="Default Value"
                                    value={this.props.userData.data.road_address_name}
                                />
                                <TextField
                                    label="(구)지번주소"
                                    className={classes.pos}
                                    multiline
                                    fullWidth
                                    defaultValue="Default Value"
                                    value={this.props.userData.data.address_name}
                                />
                                <TextField
                                    label="상세위치"
                                    className={classes.pos}
                                    multiline
                                    fullWidth
                                    defaultValue="Default Value"
                                    value={this.props.userData.data.address_name2}
                                />
                                <TextField
                                    label="지하철 이용시"
                                    className={classes.pos2}
                                    multiline
                                    InputProps={{
                                        classes: {
                                          input: classes.pos2,
                                        },
                                      }}
                                    fullWidth
                                    defaultValue="Disabled" disabled
                                    value=' 동인천역 2번 출구 -> 지하상가 5번출구 국민은행 앞 셔틀버스 수시 운행
                                    수인분당선 숭의(인하대병원)역 2번출구 -> 셔틀버스 수시 운행'
                                />
                                <TextField
                                    label="버스 이용시"
                                    className={classes.pos2}
                                    multiline
                                    InputProps={{
                                        classes: {
                                          input: classes.pos2,
                                        },
                                      }}
                                    fullWidth
                                    defaultValue="Disabled" disabled
                                    value=' 조달청 비축기지 정류장(도보1분) - 12, 13, 24, 36, 330
                                     신선 초등학교 정류장(도보3분) - 14, 46
                                     인하대병원 정류장(도보8분) - 9, 33, 517, 519, 9100'
                                />
                                <Paper className={classes.paper_root} elevation={3}>
                                    <Typography color="textSecondary" >
                                        길찾기 앱 연결
                                </Typography>
                                    <Grid className={classes.logo} container spacing={8}>
                                        <Grid item xs={6}
                                            container
                                            alignItems='center'
                                            justifyContent='center'>
                                            <img id='tmap' src={tmapLogo} alt="Logo" onClick={this.handleClick_navigation} />
                                        </Grid>
                                        <Grid item xs={6}
                                            container
                                            alignItems='center'
                                            justifyContent='center'>
                                            <img id='kakao' src={kakaoNaviLogo} alt="Logo" onClick={this.handleClick_navigation} />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </CardContent>
                        </Card>
                    </div>

                </Grid>
            </div>
        );
    }
}

export default (withStyles(styles)(Map));

