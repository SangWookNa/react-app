import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import logo from './../image/kakao_account_login.png';

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
    const url = 'https://kauth.kakao.com/oauth/authorize?client_id=9e7171f1d9599641378cd3e36174adbc&redirect_uri=http://localhost:3000/oauth&response_type=code';

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
            <a><img src={logo} alt="Logo" onClick={this.handleUpload}/></a>
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