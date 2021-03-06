import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    cont: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    subCont: {
        paddingBottom: theme.spacing.unit * 2,
    },
    chip: {
        margin: theme.spacing.unit,
        fontSize: 13,
    },
});

class Invitation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0, contHeight: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight - 250, contHeight: window.innerHeight });
    }
    shouldComponentUpdate(nextProps, nextState) {
        let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
        return update;
    }

    render() {
        const { classes } = this.props;
        const userDataForm = (
            <div>
                <Typography variant="h6" component="h3" align="center">
                    {this.props.userData.data.groom} · {this.props.userData.data.bride}
                </Typography>
                <Grid
                    container
                    alignItems='center'
                    justify='center'>
                    <Chip label={this.props.userData.data.marry_date_time_view} className={classes.chip} />
                </Grid>
                <Typography align="center" className={classes.subCont}>
                    {this.props.userData.data.place_name} {this.props.userData.data.address_name2}
                </Typography>
            </div>);

        return (
            <div style={{ marginTop : 50, minHeight: this.state.contHeight + 'px' }}>
                <Paper className={classes.root} elevation={3} >
                    <Typography variant="h6" component="h3" align="center">
                        결혼식에 초대합니다.
                    </Typography>
                    <Grid className={classes.cont}
                        container
                        alignItems='center'
                        justify='center'
                        style={{ minHeight: this.state.height + 'px' }}>
                        <img style={{ width: '100%', borderRadius: '20px' }} alt="img" align="center" src={this.props.images[0].src} />
                    </Grid>
                    {this.props.userData.data.groom === '' ? undefined : userDataForm}
                </Paper>
            </div>
        );
    }
}

Invitation.propTypes = {
    classes: PropTypes.object.isRequired,
};

Invitation.defaultProps = {
    userData: {
        data: {
            groom: '',
            bride: '',
            marry_date_time_view: '',
            place_name: '',
            address_name2: '',
        }
    }
};

export default withStyles(styles)(Invitation);