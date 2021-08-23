import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Divider, FormControlLabel, RadioGroup, Radio, Checkbox, TextField, Container, Typography } from '@material-ui/core';
import { useEffect } from 'react';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 30,
  },
  title: {
    textAlign: 'left'
  },
  titleContent: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  must: {
    color: 'red',
    fontSize: 22,
  },
  content: {
    marginLeft: 14,
  },
  blankContent: {
    marginTop: 10
  },
});

function ShowClasses(props) {
  const classes = useStyles();
  return (
    <Container fixed className={classes.title}>
      <Typography component='span' className={classes.must}>{props.must ? '*' : null}</Typography>
      <Typography component='span' className={classes.titleContent}>{props.title}</Typography>
    </Container>
  );
}

function SingleChoice(props) {
  const classes = useStyles();

  useEffect(() => {
    console.log(props)
  }, [])

  return (
    <RadioGroup className={classes.content}>
      {props.problem.choices.map((choice) => 
        <FormControlLabel value={choice} control={<Radio />} label={choice}/>
      )}
    </RadioGroup>
  );
}

function MultiChoice(props) {
  const classes = useStyles();
  var option = {};
  
  props.problem.choices.map((choice) => option[choice]=false);
  const [state, setState] = React.useState(option);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <RadioGroup className={classes.content}>
      {props.problem.choices.map((choice) => 
        <FormControlLabel 
          control={<Checkbox checked={state[choice]} onChange={handleChange} name={choice} />} 
          label={choice}
        />
      )}
    </RadioGroup>
  );
}

function FillBlanks(props) {
  const classes = useStyles();

  return (
    <TextField
      className={classes.blankContent}
      id="outlined-multiline-static"
      multiline
      rows={4}
      variant="outlined"
      fullWidth={true}
    />
  );
}

function Problem(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <ShowClasses title={props.problem.title} must={props.problem.must} />
        <Divider />
        {props.problem.kind === 0 ? <SingleChoice problem={props.problem}/> : null}
        {props.problem.kind === 1 ? <MultiChoice problem={props.problem}/> : null}
        {props.problem.kind === 2 ? <FillBlanks problem={props.problem}/> : null}
        {props.children}
      </CardContent>
    </Card>
  );
}

function isSingleChoice(problem) {return problem.kind === 0;}
function isMultiChoice(problem) {return problem.kind === 1;}
function isFillBlank(problem) {return problem.kind === 2;}

export default Problem;
export { isSingleChoice, isMultiChoice, isFillBlank}