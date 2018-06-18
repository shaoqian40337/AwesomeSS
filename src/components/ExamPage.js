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
import Typography from '@material-ui/core/Typography';

import ExamSection from './ExamSections'

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
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    //marginBottom: 16,
    fontSize: 30
  },
  pos: {
    //marginBottom: 12
  },
  grid: {
    flexGrow: 1,
    paddingTop: 16,
  },
});

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {exam:{
	date:"",
	id:"",
	source:"",
	mathWC:0,
	mathWOC:0,
	reading:0,
	writing:0,
	mathWC_ref:{},
	mathWOC_ref:{},
	reading_ref:{},
	writing_ref:{},
}};

class ExamPage extends Component{
	constructor(props){
		super(props);
		this.state =  {...INITIAL_STATE};
		console.log("come to exma page " + Object.entries(this.props.location.state));
	}

	getExam(exam){
		this.setState(byPropKey("exam", exam));
		//console.log("exam" + this.state.exams);
	}

	componentDidMount(){
		const exam = []
		firestore.getExamWithRef(this.props.location.state.examRef).then(function(doc) {
		    if (doc.exists) {
		        console.log("Document data:", doc.data());
		        this.getExam(doc.data());
		    } else {
		        // doc.data() will be undefined in this case
		        console.log("No such document!");
			}
		}.bind(this));
	}

	componentWillUnmount(){
		this.getExam = ()=>{}
	}

	backToAllExam = (event) => {
		// go back to previous page
		const {
	      history,
	    } = this.props;
	    history.push(routes.HOME);
	    event.preventDefault();
	}

	render(){
		const { classes } = this.props;
		const { exam } = this.state;
		return(
			<div>
			<Button size="small" onClick={this.backToAllExam}>Back</Button>
			<Typography className={classes.title} color="textSecondary">
              {this.state.exam.source + " " + this.state.exam.date}
            </Typography>
			<ExamSection sectionType={"Reading"} questionRef={exam.reading_ref} examRef={this.props.location.state.examRef}/>
			<ExamSection sectionType={"Writing"} questionRef={exam.writing_ref} examRef={this.props.location.state.examRef}/>
			<ExamSection sectionType={"Math with Calculator"} questionRef={exam.mathWC_ref} examRef={this.props.location.state.examRef}/>
			<ExamSection sectionType={"Math without Calculator"} questionRef={exam.mathWOC_ref} examRef={this.props.location.state.examRef}/>
			</div>
		);
	}
}

export default withRouter(withStyles(styles)(ExamPage));