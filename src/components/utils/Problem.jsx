import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import {
  Divider,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  TextField,
  Container,
  Typography,
  Button,
  Grid,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { useEffect } from 'react'
import { useState } from 'react'
import { getIP, getLocation } from 'api/location'
import Skeleton from '@material-ui/lab/Skeleton'
import { surplus } from 'api/result'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginTop: 30,
  },
  title: {
    textAlign: 'left',
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
    marginTop: 10,
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
  scoring: {
    marginLeft: theme.spacing(5),
  },
  Location: {
    marginLeft: theme.spacing(5),
  },
}))

function ShowClasses(props) {
  const classes = useStyles()
  return (
    <Container fixed className={classes.title}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={7}>
          <Typography component='span' className={classes.must}>
            {props.must ? '*' : null}
          </Typography>
          <Typography component='span' className={classes.titleContent}>
            {props.title}
          </Typography>
        </Grid>
        <Grid item>
          {props.children}
        </Grid>
      </Grid>
    </Container>
  )
}

function SingleChoice(props) {
  const classes = useStyles()
  const [choice, setChoice] = useState([])
  const [value, setValue] = useState('')

  useEffect(() => {
    // console.log(props.showquota)
    let tmp = []
    for (let i = 0; i < props.problem.choices.length; ++i) {
      tmp.push({
        key: '' + i,
        content: props.problem.choices[i],
        maxquota: props.problem.quota ? props.problem.quota[i] : 5,
        quota: props.quota ? props.quota[i] : 0,
      })
    }
    setChoice(tmp)
  }, [props])

  const handleChange = (event) => {
    setValue(event.target.value)
    // console.log(event.target.value)
    for (let i = 0; i < choice.length; ++i)
      if (event.target.value === choice[i].key) props.updateAns(['' + i])
  }

  return (
    <RadioGroup
      className={classes.content}
      value={value}
      onChange={handleChange}
    >
      {choice.map((choice, index) => (
        <FormControlLabel
          value={choice.key}
          control={<Radio key={choice.key} />}
          label={
            choice.content +
            (
              props.showquota
              ? props.quota[0] === -1
                ? ' 总容量: ' + choice.maxquota
                : ' (' + choice.quota + '/' + choice.maxquota + ')'
              : ''
            ) + (
              props.showvote ? 
              ' (此选项已被选择 ' + props.problem.count[index] + ' 次)' 
              : ''
            )
            
          }
          key={choice.key}
        />
      ))}
    </RadioGroup>
  )
}

function MultiChoice(props) {
  const classes = useStyles()

  const [choice, setChoice] = useState([])
  useEffect(() => {
    // console.log(props)
    let tmp = []
    for (let i = 0; i < props.problem.choices.length; ++i) {
      tmp.push({
        key: '' + i,
        content: props.problem.choices[i],
        maxquota: props.problem.quota ? props.problem.quota[i] : 5,
        quota: props.quota ? props.quota[i] : 0,
      })
    }
    setChoice(tmp)
  }, [props])

  // console.log(props.quota)

  var option = {}
  props.problem.choices.map((choice) => (option[choice.key] = false))

  const [state, setState] = useState(option)

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
    let singleAns = []
    for (let i = 0; i < choice.length; ++i) {
      if (choice[i].key === event.target.name) {
        if (event.target.checked) singleAns.push('' + i)
      } else {
        if (state[choice[i].key]) singleAns.push('' + i)
      }
    }
    props.updateAns(singleAns)
  }

  return (
    <RadioGroup className={classes.content}>
      {choice.map((choice, index) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={choice[choice.key]}
              onChange={handleChange}
              name={choice.key}
            />
          }
          label={
            choice.content +
            (
              props.showquota
              ? props.quota[0] === -1
                ? ' 余量: ' + choice.maxquota
                : ' (' + choice.quota + '/' + choice.maxquota + ')'
              : ''
            ) + (
              props.showvote ? 
              ' (此选项已被选择 ' + props.problem.count[index] + ' 次)' 
              : ''
            ) 
          }
          key={choice.key}
        />
      ))}
    </RadioGroup>
  )
}

function FillBlanks(props) {
  const classes = useStyles()
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    let len = props.problem.kind === 2 ? 50 : 500
    if (event.target.value.length <= len + 1) {
      setValue(event.target.value)
      props.updateAns([event.target.value])
    }
  }

  function checkError() {
    let len = props.problem.kind === 2 ? 50 : 500
    return value.length > len
  }

  function getErrorMSG() {
    let len = props.problem.kind === 2 ? 50 : 500
    return '当前字数：' + value.length + ' / ' + len
  }

  return (
    <TextField
      className={classes.blankContent}
      // id='outlined-multiline-static'
      error={checkError()}
      helperText={getErrorMSG()}
      multiline={props.problem.kind === 3}
      rows={props.problem.kind === 2 ? 1 : 4}
      variant='outlined'
      value={value}
      onChange={handleChange}
      placeholder='请在此处输入答案'
      fullWidth={true}
    />
  )
}

function ShortAnswer(props) {
  const classes = useStyles()
  const [value, setValue] = useState('')
  const len = 500

  const handleChange = (event) => {
    if (event.target.value.length <= len + 1) {
      setValue(event.target.value)
      props.updateAns([event.target.value])
    }
  }

  function checkError() {
    return value.length > len
  }

  function getErrorMSG() {
    return '当前字数：' + value.length + ' / ' + len
  }

  return (
    <TextField
      className={classes.blankContent}
      // id='outlined-multiline-static'
      error={checkError()}
      helperText={getErrorMSG()}
      multiline
      rows={4}
      variant='outlined'
      value={value}
      onChange={handleChange}
      placeholder='请在此处输入答案'
      fullWidth
    />
  )
}

function Scoring(props) {
  const classes = useStyles()

  const [value, setValue] = useState(1)

  function handleChange(newValue) {
    setValue(newValue)
    props.updateAns([newValue])
  }

  return (
    <Grid
      container
      direction='row'
      justifyContent='flex-start'
      alignItems='center'
    >
      {/* <Grid item xs={6}><Typography className={classes.plainText}>拖动滑块做出选择：</Typography></Grid> */}
      <Grid item className={classes.scoring}>
        <Rating
          value={value}
          onChange={(event, newValue) => {
            handleChange(newValue)
          }}
          max={props.maxScore}
        />
        {value != null && <Typography> 当前评分为：{value} 分</Typography>}
      </Grid>
    </Grid>
  )
}

function Location(props) {
  const classes = useStyles()
  const [address, setAddress] = useState('')

  function handleSetAddress(address) {
    setAddress(address)
    props.updateAns([address])
  }

  const handleGetLocation = () => {
    getIP()
      .then((res) => {
        // console.log(res.data.ip)
        getLocation(res.data.ip, handleSetAddress)
      })
      .catch(() => {
        getLocation('106.39.42.200', handleSetAddress)
      })
  }

  return (
    <Grid
      container
      direction='row'
      justifyContent='flex-start'
      alignItems='center'
      className={classes.Location}
    >
      {address === '' && (
        <Button color='primary' onClick={handleGetLocation} variant='outlined'>
          点击获取位置信息
        </Button>
      )}
      {address !== '' && <Typography>您的位置：{address}</Typography>}
    </Grid>
  )
}

function Problem(props) {
  const classes = useStyles()
  const [quota, setQuota] = useState([-1]);

  function handleQuery() {
    surplus({qid: props.problem.id}).then((res) => {
      // console.log(res.data);
      setQuota(res.data.surplus);
    })
  }

  // console.log(props)
  return (
    <Card className={classes.root}>
      <CardContent>
        <ShowClasses
          title={
            (props.showindex === true
              ? '第 ' + (props.problem.key + 1) + ' 题 '
              : '') + props.problem.title
          }
          must={props.problem.must}
        >
          {
            props.fillmode && isChoice(props.problem) && props.showquota && 
            <Button  
              color="secondary" 
              variant="contained"
              size="small"
              onClick={() => handleQuery()}
            >
              刷新余量
            </Button>
          }
        </ShowClasses>
        
        <Divider />
        <Typography className={classes.description}>
          {' '}
          {props.problem.description}
        </Typography>
        {isSingleChoice(props.problem) && <SingleChoice {...props} />}
        {isMultiChoice(props.problem) && <MultiChoice {...props} />}
        {isFillBlank(props.problem) && <FillBlanks {...props} />}
        {isShortAnswer(props.problem) && <ShortAnswer {...props} />}
        {isScoring(props.problem) && <Scoring {...props} />}
        {isLocation(props.problem) && <Location {...props} />}
        {props.children}
      </CardContent>
    </Card>
  )
}

function ProblemSkeleton(props) {
  const classes = useStyles()
  // console.log(props.showindex)
  return (
    <Card className={classes.root}>
      <CardContent>
        <Skeleton>
          <ShowClasses title='第 1 题 zhe shi yi ge biao ti ' />
        </Skeleton>
        <Divider />
        <Skeleton>
          <Typography className={classes.description}>
            {' '}
            {'这里放一段很长的描述'}
          </Typography>
        </Skeleton>
        <Skeleton variant='rect' height={100} />
      </CardContent>
    </Card>
  )
}

function isSingleChoice(problem) {
  return problem.kind === 0
}

function isMultiChoice(problem) {
  return problem.kind === 1
}

function isFillBlank(problem) {
  return problem.kind === 2
}

function isShortAnswer(problem) {
  return problem.kind === 3
}

function isScoring(problem) {
  return problem.kind === 4
}

function isLocation(problem) {
  return problem.kind === 5
}

function isChoice(problem) {
  return isSingleChoice(problem) || isMultiChoice(problem)
}

Problem.defaultProps = {
  showindex: false,
  showquota: false,
  showvote: false,
  fillmode: false,
  quota: [-1],
}

export default Problem

export {
  isSingleChoice,
  isMultiChoice,
  isFillBlank,
  isShortAnswer,
  isScoring,
  ProblemSkeleton,
}
