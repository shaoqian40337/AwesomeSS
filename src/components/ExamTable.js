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

class ExamTable extends Component{
	constructor(props){
		super(props);
		this.state = {exams: new Array(0),}
		this.getExams = this.getExams.bind(this)
	}

	getExams(exams){
		this.setState(byPropKey("exams", exams));
		console.log("exams" + this.state.exams);
	}

	componentDidMount(){
		const exams = []
		firestore.getAllExam().then(function(querySnapshot) {
	        querySnapshot.forEach(function(doc) {
	 			const {id} = doc.data()
	 			exams.push({id: id,})
	 			console.log("get => " + id);
	        });
	        console.log("logged exams" + exams);
	        this.getExams(exams);
    	}.bind(this));
	}

	componentWillUnmount(){
		this.getExams = ()=>{}
	}

	onSubmit = event => {
    	//this.setState(byPropKey("count", this.state.count + 1));
    	// router to new exam page
  	};

  	toExamDetail = event =>{
  		// router to exam page
  	};

  	render() {
    const { classes } = this.props;
    var exams = [];
    console.log("exams length" + this.state.exams.length);
    for (var i = 0; i < this.state.exams.length; i++) {
    	console.log("exam number " + this.state.exams[i].id);
      exams.push(
      	<Grid key={"exam" + i}  item>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              {this.state.exams[i].id}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              source
            </Typography>
            <Typography component="p">
              year
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={this.toExamDetail}>View Exam</Button>
          </CardActions>
        </Card>
        </Grid>
      );
    }
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography variant="headline" component="h3">
          Exams:
        </Typography>
        <Typography component="p">
          Click on "View Exam" to view the detail of the exam
        </Typography>
        <Grid container
        	spacing={16}
            className={classes.grid}
            alignItems="flex-start"
            direction="row"
            justify="flex-start">
        {exams}
        <Grid key={"AddExam"}  item>
        <Button variant="contained" onClick={this.onSubmit}>
          Add New Exam
        </Button>
        </Grid>
        </Grid>
      </Paper>
    );
  }

}

export default withStyles(styles)(ExamTable);