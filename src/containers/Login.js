import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import logo from './../image/kakao_account_login.png';
import * as value from '../globals';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: 500,
  },
});

class Login extends React.Component {

  handleUpload = (e) => {
    const url = `${value.KAKAO_LOGIN_URL}?client_id=${value.KAKAO_CLIENT_ID}&redirect_uri=${value.KAKAO_REDIRECT_URL}&response_type=code`;

    window.location.href = url;
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.demo}
            alignItems='center'
            direction='row'
            justify='center'
          >
            <img src={logo} alt="Logo" onClick={this.handleUpload} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);