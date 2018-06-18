import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { firestore } from '../firebase';
import * as routes from '../constants/routes';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import blue from "@material-ui/core/colors/blue";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import TextField from '@material-ui/core/TextField';

import Picker from 'react-month-picker'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  input: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class NewExamPage extends Component {
	constructor(props) {
		super(props)
		this.state = {source:"",
					  date:"",}
	}
	backToAllExam = (event) => {
		// go back to previous page
		const {
	      history,
	    } = this.props;
	    history.push(routes.HOME);
	    event.preventDefault();
	}

	onSubmit = (event) => {
		// push the form to store base
		// TO DO !!!
		const { source, date, reading, writing, mathWC, mathWOC} = this.state;
		const exame_meta_data = {id: source+"_"+date,
								source: source,
								date: date,
								reading: reading,
								reading_ref:{},
								writing: writing,
								writing_ref: {},
								mathWC: mathWC,
								mathWC_ref:{},
								mathWOC: mathWOC,
								mathWOC_ref: {},};
		firestore.addNewExam(exame_meta_data).then(function(docRef) {
		    console.log("Document written with ID: ", docRef.id);
		    // and jump to exam page
			const {
		      history,
		    } = this.props;
		    history.push(routes.EXAM, {examRef:docRef.id});
		}.bind(this));
		event.preventDefault();
	}

	render(){
	  	const { classes } = this.props;
	  	const { source, date, reading, writing, mathWC, mathWOC} = this.state
	  	return (
		      <Paper className={classes.root} elevation={4}>
		      	<Button size="small" onClick={this.backToAllExam}>Cancel</Button>
		        <Typography variant="headline" component="h3">
		          New SAT Exam
		        </Typography>
		        <div>
		        <FormControl className={classes.formControl}>
		          <InputLabel htmlFor="source-simple">Source</InputLabel>
		          <Select
	  	            value={this.state.source}
		            onChange={event => this.setState(byPropKey('source', event.target.value))}
			          inputProps={{
			            name: 'source',
			            id: 'source-simple',
			          }}
			        >
		            <MenuItem value="">
		              <em>None</em>
		            </MenuItem>
		            <MenuItem value={"College Board"}>College Board</MenuItem>
		            <MenuItem value={"Kaplan"}>Kaplan</MenuItem>
		          </Select>
		        </FormControl>
		        <TextField
		          id="date-input"
		          label="Date"
		          className={classes.textField}
		          //type="password"
		          //autoComplete="current-password"
		          value={date}
          		  onChange={event => this.setState(byPropKey('date', event.target.value))}
		          margin="normal"
		        />
			    </div>
			    <Typography component="p">
		          Number of questions per section
		        </Typography>
		        <div>
		        	<TextField
			          id="reading-input"
			          label="Reading"
			          className={classes.textField}
			          //type="password"
			          //autoComplete="current-password"
			          value={reading}
	          		  onChange={event => this.setState(byPropKey('reading', event.target.value))}
			          margin="normal"
			        />
			        <TextField
			          id="writing-input"
			          label="Writing"
			          className={classes.textField}
			          //type="password"
			          //autoComplete="current-password"
			          value={writing}
	          		  onChange={event => this.setState(byPropKey('writing', event.target.value))}
			          margin="normal"
			        />
			        <TextField
			          id="mathWC-input"
			          label="Math with Calculator"
			          className={classes.textField}
			          //type="password"
			          //autoComplete="current-password"
			          value={mathWC}
	          		  onChange={event => this.setState(byPropKey('mathWC', event.target.value))}
			          margin="normal"
			        />
			        <TextField
			          id="mathWOC-input"
			          label="Math without Calculator"
			          className={classes.textField}
			          //type="password"
			          //autoComplete="current-password"
			          value={mathWOC}
	          		  onChange={event => this.setState(byPropKey('mathWOC', event.target.value))}
			          margin="normal"
			        />
		        </div>
		        <Button variant="contained" color="primary" className={classes.button} onClick={this.onSubmit}>
	        		Create
	      		</Button>
		      </Paper>
  		);
	}
}

NewExamPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(NewExamPage));
