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

import TextField from '@material-ui/core/TextField';
import ImageUploader from 'react-images-upload';

import SingleQuestion from './SingleQuestion';

import Divider from '@material-ui/core/Divider';

import {Cropper} from 'react-image-cropper'

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
    fontSize: 30
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
    width: 200,
  },
  iamgePicker:{
  	width:300,
  },
  divider:{
  	marginTop: 16,
  }
});

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {question_meta:{
	//numberOfQ:,
	//image:'',
	//paragraph:'',
}};

class QuestionPage extends Component{
	constructor(props){
		super(props);
		this.state =  {questionRef:props.location.state.questionRef,
		               questionType:props.location.state.questionType,
		               examRef:props.location.state.examRef,
		               newQuestion:props.location.state.newQuestion,
		               pictures: [],
		               loadedImage: false,
		               ...INITIAL_STATE,};
		console.log("come to question page " + Object.entries(this.state));
		this.onDrop = this.onDrop.bind(this);
	}

	getQuestion(exam){
		this.setState(byPropKey("exam", exam));
		//console.log("exam" + this.state.exams);
	}

	onDrop(pictureFiles, pictureDataURLs) {
		console.log(pictureFiles);
		this.setState({
            pictures : pictureDataURLs[0],
            croppedImage : pictureDataURLs[0],
        });
        this.setState(byPropKey("loadedImage", true));
	}
	componentDidMount(){
		const exam = []
		/*
		firestore.getExamWithRef(this.props.location.state.examRef).then(function(doc) {
		    if (doc.exists) {
		        console.log("Document data:", doc.data());
		        this.getExam(doc.data());
		    } else {
		        // doc.data() will be undefined in this case
		        console.log("No such document!");
			}
		}.bind(this));*/
	}

	componentWillUnmount(){
		//this.getExam = ()=>{}
	}

	backToExamSections = (event) => {
		// go back to previous page
		const {examRef} = this.state
		const {
	      history,
	    } = this.props;
	    history.push({
		  pathname: routes.EXAM,
		  state: {examRef:examRef,}
		});
	    event.preventDefault();
	}

	cropImage = (event) => {
		this.setState({croppedImage:this.cropper.crop()})
	}

	renderQuestions = (event) => {
		// first of all save the image, if there is one, second pase the reference and paragraph to the questions

	}

	render(){
		const { classes } = this.props;
		const { questionType, examRef, question_meta} = this.state;
		return(
			<Paper className={classes.root} elevation={4}>
				<Button size="small" onClick={this.backToExamSections}>back</Button>
				<TextField
		          id="paragraph-mult"
		          label="Enter Paragraph"
		          multiline
		          rows="4"
		          //defaultValue="Default Value"
		          value={question_meta.paragraph}
          		  onChange={event => this.setState(byPropKey('question_meta.paragraph', event.target.value))}
		          className={classes.textField}
		          margin="normal"
		        />
		        {this.state.loadedImage?(
		        	<div>
		        		<Cropper 
						    src={this.state.pictures}
						    ref={ ref => { this.cropper = ref }}
						    fixedRatio={false}
						/>
						<Button size="small" onClick={this.cropImage}>Crop</Button>
						<img src={this.state.croppedImage}></img>
					</div>
		        	):(
		        		<ImageUploader
	                	withIcon={true}
	                	buttonText='Choose images'
	                	onChange={this.onDrop}
	                	imgExtension={['.jpg', '.gif', '.png', '.gif']}
	                	maxFileSize={5242880}
	                	className={classes.iamgePicker}
	                	//withPreview
	            	/>)
            	}
				<TextField
		          id="numberOfQ-input"
		          label="Number of Questions"
		          className={classes.textField}
		          //type="password"
		          //autoComplete="current-password"
		          value={question_meta.numberOfQ}
          		  onChange={event => this.setState(byPropKey('question_meta.numberOfQ', event.target.value))}
          		  helperText="Based on the paragraph"
		          margin="normal"
		        />
		        <Button size="small" onClick={this.renderQuestions}>Enter Question(s)</Button>
		        <Divider className={classes.divider}/>
		        <SingleQuestion examRef={examRef}/>
			</Paper>
		);
	}
}

export default withRouter(withStyles(styles)(QuestionPage));