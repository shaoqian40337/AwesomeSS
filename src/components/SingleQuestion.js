import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { firestore } from '../firebase';

import * as routes from '../constants/routes';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import blue from "@material-ui/core/colors/blue";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import TextField from '@material-ui/core/TextField';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    maxWidth: 1000,
  }),
  card: {
    maxWidth: 200,
    //maxHeight: 200,
  },
  title: {
    //marginBottom: 16,
    fontSize: 14
  },
  pos: {
    //marginBottom: 12
  },
  grid: {
    flexGrow: 1,
    paddingTop: 16,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 500,
  },
});

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  questionCatelog:"",
  question:"",
  difficulty:"",
  answer:"",
};

class SingleQuestion extends Component{
	constructor(props){
		super(props);
		this.state = {...INITIAL_STATE,
      examRef:props.examRef,};
    }

    handleChange = event => {
      this.setState({ answer: event.target.value });
    };

    render() {
      const { classes } = this.props;
    //const { sectionType, questionRef, examRef} = this.state;
    const {question, questionCatelog, difficulty} = this.state;
    return (
      <div>
      <TextField
      id="question-mult"
      label="Enter the Question"
      multiline
      rows="4"
          //defaultValue="Default Value"
          value={question}
          onChange={event => this.setState(byPropKey('question', event.target.value))}
          className={classes.textField}
          margin="normal"
          />
          <FormControl className={classes.formControl}>
          <InputLabel htmlFor="question-type-simple">Select Type</InputLabel>
          <Select
          value={questionCatelog}
          onChange={event => this.setState(byPropKey('questionCatelog', event.target.value))}
          inputProps={{
            name: 'question-type',
            id: 'question-type',
          }}
          >
          <MenuItem value={"Placeholder 1"}>Placeholder 1</MenuItem>
          <MenuItem value={"Placeholder 2"}>Placeholder 2</MenuItem>
          </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
          <InputLabel htmlFor="question-difficulty-simple">Select Difficulty</InputLabel>
          <Select
          value={difficulty}
          onChange={event => this.setState(byPropKey('difficulty', event.target.value))}
          inputProps={{
            name: 'question-difficulty',
            id: 'question-difficulty',
          }}
          >
          <MenuItem value={"Placeholder 1"}>Placeholder 1</MenuItem>
          <MenuItem value={"Placeholder 2"}>Placeholder 2</MenuItem>
          </Select>
          </FormControl>
          <FormControl component="fieldset" required className={classes.formControl}>
          <div>
          <Grid container className={classes.grid}>
          <Grid item xs={10}>
          <FormLabel component="legend">Choices</FormLabel>
          </Grid>
          <Grid item xs={2}>
          <FormLabel component="legend">Answer</FormLabel>
          </Grid>
          <Grid item xs={10}>
          <TextField
              //id="multiline-flexible"
              label="Multiline"
              multiline
              rowsMax="4"
              value={this.state.multiline}
              //onChange={this.handleChange('multiline')}
              className={classes.textField}
              margin="normal"
              />
              </Grid>
              <Grid item xs={2}>
              <Radio
                checked={this.state.answer === 'a'}
                onChange={this.handleChange}
                value="a"
                name="radio-button-demo"
                aria-label="A"
              />
              </Grid>
              <Grid item xs={10}>
              <TextField
              //id="multiline-flexible"
              label="Multiline"
              multiline
              rowsMax="4"
              value={this.state.multiline}
              //onChange={this.handleChange('multiline')}
              className={classes.textField}
              margin="normal"
              />
              </Grid>
              <Grid item xs={2}>
              <Radio
                checked={this.state.answer === 'b'}
                onChange={this.handleChange}
                value="b"
                name="radio-button-demo"
                aria-label="B"
              />
              </Grid>
              <Grid item xs={10}>
              <TextField
              //id="multiline-flexible"
              label="Multiline"
              multiline
              rowsMax="4"
              value={this.state.multiline}
              //onChange={this.handleChange('multiline')}
              className={classes.textField}
              margin="normal"
              />
              </Grid>
              <Grid item xs={2}>
              <Radio
                checked={this.state.answer === 'c'}
                onChange={this.handleChange}
                value="c"
                name="radio-button-demo"
                aria-label="C"
              />
              </Grid>
              <Grid item xs={10}>
              <TextField
              //id="multiline-flexible"
              label="Multiline"
              multiline
              rowsMax="4"
              value={this.state.multiline}
              //onChange={this.handleChange('multiline')}
              className={classes.textField}
              margin="normal"
              />
              </Grid>
              <Grid item xs={2}>
              <Radio
                checked={this.state.answer === 'd'}
                onChange={this.handleChange}
                value="d"
                name="radio-button-demo"
                aria-label="D"
              />
              </Grid>
              </Grid>
              </div>
              </FormControl>
              </div>
              );
  }

}

export default withRouter(withStyles(styles)(SingleQuestion));