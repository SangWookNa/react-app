import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Image from '@material-ui/icons/Image';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { BrowserRouter as Link, NavLink } from "react-router-dom";
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

    console.log(this.props.userInfo);

    axios.post('/api/kakao/logout', { token: this.props.userInfo.info.access_token }).then((result) => {

      //logout the session
      let loginData = {
        isLoggedIn: false,
        username: '',
      };
      document.cookie = 'key=' + btoa(JSON.stringify(loginData));

      window.location.reload();

    }).catch((error) => {
      // handle error
      alert(error);
    })
  }

  handleUnlink = (e) => {

    axios.post('/api/kakao/unlink', { token: this.props.userInfo.info.access_token }).then((result) => {

      alert('앱 연결이 해제되었습니다.');
      window.location.href = window.location.origin;

    }).catch((error) => {
      // handle error
      alert(error);
    })
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
                        <ListItemIcon><PowerSettingsNew /></ListItemIcon>
                        <ListItemText primary='unlink' />
                      </ListItem>
                    </List>);

    const sideList = (
      <div className={classes.list}>
        <List>
          <NavLink to="/VideoUpload" className={classes.item}>
            <ListItem button key='ImageUpload' >
              <ListItemIcon><Image /></ListItemIcon>
              <ListItemText primary='Image Upload' />
            </ListItem>
          </NavLink>
          <ListItem button key='VideoUpload'>
            <ListItemIcon><VideoLibrary /></ListItemIcon>
            <ListItemText primary='Video Upload' />
          </ListItem>
        </List>
        <Divider />
        {this.props.userInfo.isLoggedIn === true ? logout : undefined}
        {this.props.userInfo.isLoggedIn === true ? unlink : undefined}
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
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <NavLink to="/" className={classes.item}>{this.props.userInfo.info.nickname}</NavLink>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

Header.defaultProps = {
  userInfo: {},
}

export default withStyles(styles)(Header);