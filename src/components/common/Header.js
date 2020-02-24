import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PowerOff from '@material-ui/icons/PowerOff';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Home from '@material-ui/icons/Home';
import Face from '@material-ui/icons/Face';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  item: {
    color: 'inherit',
    textDecoration: 'none',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class Header extends Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleLogout = (e) => {

    axios.post('/api/kakao/logout', { token: this.props.status.info.access_token }).then((result) => {

      //logout the session
      let loginData = {
        isLoggedIn: false,
        username: '',
      };
      document.cookie = 'key=' + btoa(JSON.stringify(loginData));

      //window.location.reload();
      window.location.href = window.location.origin;

    }).catch((error) => {
      // handle error
      alert(error);
    })
  }

  handleUnlink = (e) => {

    axios.post('/api/kakao/unlink', { token: this.props.status.info.access_token }).then((result) => {

      //logout the session
      let loginData = {
        isLoggedIn: false,
        username: '',
      };
      document.cookie = 'key=' + btoa(JSON.stringify(loginData));

      alert('앱 연결이 해제되었습니다.');
      window.location.href = window.location.origin;

    }).catch((error) => {
      // handle error
      alert(error);
    })
  }

  handleHome = () => {
    window.location.href = window.location.origin + '/Main';
  }
  handleBack = () => {
    window.location.href = window.location.origin + '/Main';
  }

  render() {
    const { classes } = this.props;
    const logout = (<List>
      <ListItem button key='Logout' onClick={this.handleLogout}>
        <ListItemIcon><PowerSettingsNew /></ListItemIcon>
        <ListItemText primary='Logout' />
      </ListItem>
    </List>);
    const unlink = (<List>
      <ListItem button key='unlink' onClick={this.handleUnlink}>
        <ListItemIcon><PowerOff /></ListItemIcon>
        <ListItemText primary='앱 탈퇴' />
      </ListItem>
    </List>);

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button key='VideoUpload'>
            <ListItemIcon><Face fontSize="large" /></ListItemIcon>
            <ListItemText primary={`환영합니다 ${this.props.status.info.nickname}님`} />
          </ListItem>
        </List>
        <Divider />
        {this.props.status.isLoggedIn === true ? logout : undefined}
        {this.props.status.isLoggedIn === true ? unlink : undefined}
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar color="primary" position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} onClick={this.toggleDrawer('left', true)} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              open={this.state.left}
              onClose={this.toggleDrawer('left', false)}
              onOpen={this.toggleDrawer('left', true)}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('left', false)}
                onKeyDown={this.toggleDrawer('left', false)}
              >
                {sideList}
              </div>
            </SwipeableDrawer>
            <Home className={classes.grow} fontSize="large" onClick={this.handleHome} />

            {this.props.path !== 'Main' ? <Button onClick={this.handleBack} color="inherit">back</Button> : <Button color="inherit" onClick={this.handleLogout}>logout</Button>}
          </Toolbar>

        </AppBar>
        {this.props.children}
      </div>

    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
