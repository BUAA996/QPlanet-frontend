import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Divider, FormControlLabel, RadioGroup, Radio, Checkbox, TextField, Container, Typography, Slider, Box, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
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
  description: {
    color: theme.palette.text.secondary,
    textAlign: 'left',
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(1),
  },
  plainText: {
    color: theme.palette.text.primary,
    textAlign: 'left',
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(1),
  },
  scoringSlider: {
    marginLeft: theme.spacing(8)
  }
}));

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
    // console.log(props)
    let tmp = [];
    for (let i = 0; i < props.problem.choices.length; ++i) {
      tmp.push({
        key: "" + i,
        content: props.problem.choices[i],
      })
    }
    setChoice(tmp);
  }, [props])

  const handleChange = (event) => {
    setValue(event.target.value)
    // console.log(event.target.value)
    for (let i = 0; i < choice.length; ++i)
      if (event.target.value === choice[i].key)
        props.updateAns(['' + i]);
  }

  return (
    <RadioGroup className={classes.content} value={value} onChange={handleChange}>
      {choice.map((choice) =>
        <FormControlLabel value={choice.key} control={<Radio key={choice.key} />} label={choice.content} key={choice.key} />
      )}
    </RadioGroup>
  );
}

function MultiChoice(props) {
  const classes = useStyles();

  const [choice, setChoice] = useState([]);
  useEffect(() => {
    // console.log(props)
    let tmp = [];
    for (let i = 0; i < props.problem.choices.length; ++i) {
      tmp.push({
        key: '' + i,
        content: props.problem.choices[i],
      })
    }
    setChoice(tmp);
  }, [props])

  var option = {};
  props.problem.choices.map((choice) => option[choice.key] = false);

  const [state, setState] = useState(option);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    let singleAns = [];
    for (let i = 0; i < choice.length; ++i) {
      if (choice[i].key === event.target.name) {
        if (event.target.checked) singleAns.push('' + i);
      } else {
        if (state[choice[i].key]) singleAns.push('' + i);
      }
    }
    props.updateAns(singleAns);
  };

  return (
    <RadioGroup className={classes.content}>
      {choice.map((choice) =>
        <FormControlLabel
          control={<Checkbox checked={choice[choice.key]} onChange={handleChange} name={choice.key} />}
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
    let len = props.problem.kind === 2 ? 50 : 500;
    if (event.target.value.length <= len + 1) {
      setValue(event.target.value);
      props.updateAns([event.target.value]);
    }
  }

  function checkError() {
    let len = props.problem.kind === 2 ? 50 : 500;
    return value.length > len;
  }

  function getErrorMSG() {
    let len = props.problem.kind === 2 ? 50 : 500;
    return "当前字数：" + value.length + " / " + len;
  }

  return (
    <TextField
      className={classes.blankContent}
      id="outlined-multiline-static"
      error={checkError()}
      helperText={getErrorMSG()}
      multiline={props.problem.kind === 3}
      rows={props.problem.kind === 2 ? 1 : 4}
      variant="outlined"
      value={value}
      onChange={handleChange}
      placeholder='请在此处输入答案'
      fullWidth={true}
    />
  );
}

function ShortAnswer(props) {
  const classes = useStyles();
  const [value, setValue] = useState('')
  const len = 500;

  const handleChange = (event) => {
    if (event.target.value.length <= len + 1) {
      setValue(event.target.value);
      props.updateAns([event.target.value]);
    }
  }

  function checkError() {
    return value.length > len;
  }

  function getErrorMSG() {
    return "当前字数：" + value.length + " / " + len;
  }

  return (
    <TextField
      className={classes.blankContent}
      id="outlined-multiline-static"
      error={checkError()}
      helperText={getErrorMSG()}
      multiline
      rows={4}
      variant="outlined"
      value={value}
      onChange={handleChange}
      placeholder='请在此处输入答案'
      fullWidth
    />
  );
}

function Scoring(props) {
  const classes = useStyles();

  const marks = [
    {value: 0, label: '0'},
    {value: 50, label: '50'},
    {value: 100, label: '100'}
  ];

  function valuetext(value) {
    return '当前选择：' + value;
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid item xs={12}><Typography className={classes.plainText}>拖动滑块做出选择：</Typography></Grid>
      <Grid item xs={6} className={classes.scoringSlider}>
        <Slider
          defaultValue={10}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-small-steps"
          step={1}
          marks={marks}
          min={0}
          max={100}
          valueLabelDisplay="auto"
        /> 
      </Grid>
    </Grid>
    
  );
}

function Problem(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <ShowClasses title={"第 " + (props.problem.key + 1) + " 题 " + props.problem.title} must={props.problem.must} />
        <Divider />
        <Typography className={classes.description}> {props.problem.description}</Typography>
        {isSingleChoice(props.problem) && <SingleChoice {...props}/>}
        {isMultiChoice(props.problem) && <MultiChoice {...props}/>}
        {isFillBlank(props.problem) && <FillBlanks {...props}/>}
        {isShortAnswer(props.problem) && <ShortAnswer {...props}/>}
        {isScoring(props.problem) && <Scoring {...props}/>}
        {props.children}
      </CardContent>
    </Card>
  );
}

function isSingleChoice(problem) { return problem.kind === 0; }
function isMultiChoice(problem) { return problem.kind === 1; }
function isFillBlank(problem) { return problem.kind === 2; }
function isShortAnswer(problem) { return problem.kind === 3;}
function isScoring(problem) { return problem.kind === 4;}

function isChoice(problem) { return isSingleChoice(problem) || isMultiChoice(problem) }

export default Problem;
export { isSingleChoice, isMultiChoice, isFillBlank, isShortAnswer, isScoring}