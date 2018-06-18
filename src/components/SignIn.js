import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import blue from "@material-ui/core/colors/blue";

const primary = blue[500];

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 'auto'
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    margin: theme.spacing.unit,
  },

});


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
  }
  
  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const {classes} = this.props

    const isInvalid =
      password === '' ||
      email === '';

    return (
    	<div className={classes.container}>
	      <Input
	        value={email}
	        onChange={event => this.setState(byPropKey('email', event.target.value))}
	        placeholder="Email Address"
	        className={classes.input}
	        inputProps={{
	          'aria-label': 'Description',
	        }}
	      />
	      <br/>
	      <Input
	        value={password}
	        onChange={event => this.setState(byPropKey('password', event.target.value))}
	        placeholder="Password"
	        className={classes.input}
	        inputProps={{
	          'aria-label': 'Description',
	        }}
	      />
	      <br/>
	      <Button variant="contained" color="primary" className={classes.button} onClick={this.onSubmit}>
	        Login
	      </Button>
    </div>
    );
  }
}



export default withRouter(withStyles(styles)(SignInForm));