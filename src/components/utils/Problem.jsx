import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Divider, FormControlLabel, RadioGroup, Radio, Checkbox, TextField, Container, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';

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
  const [choice, setChoice] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    console.log(props)
    let tmp = [];
    for (let i = 0;i < props.problem.choices.length; ++i) {
      tmp.push({
        key: i,
        content: props.problem.choices[i],
      })
    }
    setChoice(tmp);
  }, [props])

  const handleChange = (event) => {
    setValue(event.target.value)
    for (let i = 0;i < choice.length; ++i)
      if (event.target.value === choice[i].content)
        props.updateAns(['' + i]);
  }

  return (
    <RadioGroup className={classes.content} value={value} onChange={handleChange}>
      {choice.map((choice) => 
        <FormControlLabel value={choice.content} control={<Radio key={choice.key}/>} label={choice.content} key={choice.key}/>
      )}
    </RadioGroup>
  );
}

function MultiChoice(props) {
  const classes = useStyles();

  const [choice, setChoice] = useState([]);
  useEffect(() => {
    console.log(props)
    let tmp = [];
    for (let i = 0;i < props.problem.choices.length; ++i) {
      tmp.push({
        key: i,
        content: props.problem.choices[i],
      })
    }
    setChoice(tmp);
  }, [props])

  var option = {};
  props.problem.choices.map((choice) => option[choice]=false);

  const [state, setState] = React.useState(option);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    let singleAns = [];
    for (let i = 0;i < choice.length; ++i) {
      if (choice[i].content === event.target.name) {
        if (event.target.checked) singleAns.push('' + i);
      } else {
        if (state[choice[i].content]) singleAns.push('' + i);
      }
    }
    props.updateAns(singleAns);
  };

  return (
    <RadioGroup className={classes.content}>
      {choice.map((choice) => 
        <FormControlLabel 
          control={<Checkbox checked={state[choice.content]} onChange={handleChange} name={choice.content} />} 
          label={choice.content} 
          key={choice.key}
        />
      )}
    </RadioGroup>
  );
}

function FillBlanks(props) {
  const classes = useStyles();
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    setValue(event.target.value);
    props.updateAns([event.target.value]);
  }

  return (
    <TextField
      className={classes.blankContent}
      id="outlined-multiline-static"
      multiline
      rows={4}
      variant="outlined"
      value={value}
      onChange={handleChange}
      placeholder='请在此处输入答案'
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
        {props.problem.kind === 0 ? <SingleChoice {...props}/> : null}
        {props.problem.kind === 1 ? <MultiChoice {...props}/> : null}
        {props.problem.kind === 2 ? <FillBlanks {...props}/> : null}
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