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
    maxWidth: 200
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  grid: {
    flexGrow: 1,
  },
});

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class QuestionTable extends Component{
	constructor(props){
		super(props);
		this.state = {questions: new Array(0),}
		this.getExams = this.getQuestions.bind(this)
	}

	getQuestions(questions){
		this.setState(byPropKey("questions", questions));
	}

	componentDidMount(){
		const questions = []
		firestore.getAllQuestions().then(function(querySnapshot) {
	        querySnapshot.forEach(function(doc) {
	 			  const {id} = doc.data()
	 			  questions.push({id: id,})
	      });
	      this.getQuestions(questions);
    	}.bind(this));
	}

	componentWillUnmount(){
		this.getQuestions = ()=>{}
	}

	onSubmit = event => {
    	//this.setState(byPropKey("count", this.state.count + 1));
    	// router to new question page
  	};

  	toQuestionDetail = event =>{
  		// router to question page
  	};

  	render() {
    const { classes } = this.props;
    var questions = [];
    for (var i = 0; i < this.state.questions.length; i++) {
      questions.push(
      	<Grid key={"questions" + i}  item>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              {this.state.questions[i].id}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              source
            </Typography>
            <Typography component="p">
              year
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={this.toExamDetail}>View Question</Button>
          </CardActions>
        </Card>
        </Grid>
      );
    }
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          Question List:
        </Typography>
        <Typography component="p">
          Click on "View Question" to view the detail of the question
        </Typography>
        <Grid container
        	spacing={16}
            //className={classes.grid}
            alignItems="flex-start"
            direction="row"
            justify="flex-start">
        {questions}
        <Grid key={"AddQuestion"}  item>
        <Button variant="contained" onClick={this.onSubmit}>
          Add New Question
        </Button>
        </Grid>
        </Grid>
      </Paper>
    );
  }

}

export default withStyles(styles)(QuestionTable);