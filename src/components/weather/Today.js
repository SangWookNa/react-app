import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { WeatherImage } from './';
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        paddingTop: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        margin: 'auto',
    },


});

class Today extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
        return update;
    }

    render() {
        const { classes } = this.props;
        console.log(this.props.weather);
        console.log(this.props.weather.weather.hourly[0].sky);
        return (
            <div className={classes.root}>
                <Grid container spacing={8} alignItems="center" className={classes.paper}>
                    <Grid item >
                        <WeatherImage sky={this.props.weather.weather.hourly[0].sky} />
                    </Grid>
                    <Grid item xs={8} sm container alignItems="center">
                        <Typography variant="subtitle1">
                            {this.props.weather.weather.hourly[0].sky.name}
                        </Typography>
                        <Typography color="textSecondary">현재{Math.floor(this.props.weather.weather.hourly[0].temperature.tc)}℃
                                    / 최고{Math.floor(this.props.weather.weather.hourly[0].temperature.tmax)}℃
                                    / 최저{Math.floor(this.props.weather.weather.hourly[0].temperature.tmin)}℃</Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Today.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Today);