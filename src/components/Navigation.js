import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import blue from "@material-ui/core/colors/blue";

const primary = blue[500];
const styles = {
  root: {
    flexGrow: 1,
  },
  bar: {
    backgroundColor: primary
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Title
          </Typography>
          { props.authUser
        	? <NavigationAuth />
        	: <NavigationNonAuth />
    	  }
        </Toolbar>
      </AppBar>
    </div>
  );
}

const NavigationAuth = () =>
  <SignOutButton />

const NavigationNonAuth = () =>
  <Button color="inherit" href={routes.SIGN_IN}>Login</Button>

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);