import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Divider, FormControlLabel, RadioGroup, Radio, Checkbox, TextField } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 30,
  },
  title: {
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
    <p>
      <span className={classes.must}>{props.must ? '*' : null}</span>
      <span className={classes.title}>{props.title}</span>
    </p>
  );
}

function SingleChoice(props) {
  const classes = useStyles();
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
      </CardContent>
    </Card>
  );
}

export default Problem;