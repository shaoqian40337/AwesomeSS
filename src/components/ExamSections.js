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
    fontSize: 14
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

const INITIAL_STATE = {
  sectionType:"",
  questionRef:{},
};

class ExamSecion extends Component{
	constructor(props){
		super(props);
		this.state = {sectionType:props.sectionType,
                  questionRef:props.questionRef,
                  examRef:props.examRef};
	}
  /*
	componentDidMount(){
		const exams = []
		firestore.getAllExam().then(function(querySnapshot) {
	        querySnapshot.forEach(function(doc) {
	 			const {id} = doc.data()
	 			exams.push({id: id,examRef:doc.id,})
	 			console.log("get => " + doc.id)
	 			console.log("get => " + Object.entries(doc.data()));
	        });
	        //console.log("logged exams" + exams);
	        this.getExams(exams);
    	}.bind(this));
	}

	componentWillUnmount(){
		this.getExams = ()=>{}
	}*/

	toQuestion = (event, examRef, questionType, newQuestion, questionRef="") => {
    	//this.setState(byPropKey("count", this.state.count + 1));
    	// router to new exam page
    	const {
	      history,
	    } = this.props;
	    console.log("to => " + questionRef)
      console.log("from => " + examRef)
      console.log("of => " + questionType)
      history.push({
        pathname: routes.QUESTION,
        state: {questionRef:questionRef,
                questionType:questionType,
                newQuestion:newQuestion,
                examRef:examRef,}
      });
      event.preventDefault();
  	};

  render() {
    const { classes } = this.props;
    const { sectionType, questionRef, examRef} = this.state;
    
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          {sectionType}
        </Typography>
        <Typography component="p">
          Click on "View Question" to view the detail of the question
        </Typography>
        <Grid container
        	spacing={16}
            className={classes.grid}
            alignItems="flex-start"
            direction="row"
            justify="flex-start">
        {Object.keys(questionRef).map(function(key, index){
          const buttonid = questionRef[key];
          return(
            <Grid key={sectionType + index}  item>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary">
                    {key}
                  </Typography>
                </CardContent>
                <CardActions>
                  {console.log("button id => " + buttonid)}
                  <Button id={buttonid} size="small" onClick={(e)=>this.toQuestion(e, examRef, sectionType, false,buttonid)}>View Question</Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
        <Grid key={"AddQuestion"}  item>
        <Button variant="contained" onClick={(e)=>this.toQuestion(e, examRef, sectionType, true)}>
          Add New Question
        </Button>
        </Grid>
        </Grid>
      </Paper>
    );
  }

}

export default withRouter(withStyles(styles)(ExamSecion));