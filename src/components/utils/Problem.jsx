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
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { useEffect } from 'react'
import { useState } from 'react'
import { getIP, getLocation } from 'api/location'
import Skeleton from '@material-ui/lab/Skeleton'
import { surplus } from 'api/result'
import { useSnackbar } from 'notistack'

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
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
      >
        <Grid item xs={7}>
          <Typography component='span' className={classes.must}>
            {props.must ? '*' : null}
          </Typography>
          <Typography component='span' className={classes.titleContent}>
            {props.title}
          </Typography>
        </Grid>
        <Grid item>{props.children}</Grid>
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

  useEffect(() => {
    if (props.problem.initialValue !== undefined) {
      setValue('' + props.problem.initialValue[0])
    }
  }, [])

  const handleChange = (event) => {
    if (props.problem.initialValue === undefined) {
      setValue(event.target.value)
      // console.log(event.target.value)
      for (let i = 0; i < choice.length; ++i)
        if (event.target.value === choice[i].key) props.updateAns(['' + i])
    }
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
            (props.showquota
              ? props.quota[0] === -1
                ? ' (?????????: ' + choice.maxquota + ')'
                : ' (?????? ' + choice.quota + '/' + choice.maxquota + ')'
              : '') +
            (props.showvote
              ? ' (????????????????????? ' + props.problem.count[index] + ' ???)'
              : '')
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
  var option = {}
  props.problem.choices.map((choice) => (option[choice.key] = false))
  const [state, setState] = useState(option)

  useEffect(() => {
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
    if (props.problem.initialValue !== undefined) {
      let newState = {}
      tmp.forEach((item) => {
        newState[item.key] = props.problem.initialValue.includes(
          Number(item.key)
        )
      })
      setState(newState)
    }
  }, [props])

  const handleChange = (event) => {
    if (props.problem.initialValue === undefined) {
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
  }

  return (
    <RadioGroup className={classes.content}>
      {choice.map((choice, index) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={state[choice.key]}
              onChange={handleChange}
              name={choice.key}
            />
          }
          label={
            choice.content +
            (props.showquota
              ? props.quota[0] === -1
                ? ' (?????????: ' + choice.maxquota + ')'
                : ' (?????? ' + choice.quota + '/' + choice.maxquota + ')'
              : '') +
            (props.showvote
              ? ' (????????????????????? ' + props.problem.count[index] + ' ???)'
              : '')
          }
          key={choice.key}
        />
      ))}
    </RadioGroup>
  )
}

function FillBlanks(props) {
  const classes = useStyles()
  const [value, setValue] = useState(
    props.problem.initialValue === undefined ? '' : props.problem.initialValue
  )

  const handleChange = (event) => {
    if (props.problem.initialValue === undefined) {
      let len = props.problem.kind === 2 ? 50 : 500
      if (event.target.value.length <= len + 1) {
        setValue(event.target.value)
        props.updateAns([event.target.value])
      }
    }
  }

  function checkError() {
    let len = props.problem.kind === 2 ? 50 : 500
    return value.length > len
  }

  function getErrorMSG() {
    let len = props.problem.kind === 2 ? 50 : 500
    return '???????????????' + value.length + ' / ' + len
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
      placeholder='????????????????????????'
      fullWidth={true}
    />
  )
}

function ShortAnswer(props) {
  const classes = useStyles()
  const [value, setValue] = useState(
    props.problem.initialValue === undefined ? '' : props.problem.initialValue
  )
  const len = 500

  const handleChange = (event) => {
    if (props.problem.initialValue === undefined) {
      if (event.target.value.length <= len + 1) {
        setValue(event.target.value)
        props.updateAns([event.target.value])
      }
    }
  }

  function checkError() {
    return value.length > len
  }

  function getErrorMSG() {
    return '???????????????' + value.length + ' / ' + len
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
      placeholder='????????????????????????'
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
      {/* <Grid item xs={6}><Typography className={classes.plainText}>???????????????????????????</Typography></Grid> */}
      <Grid item className={classes.scoring}>
        <Rating
          value={value}
          name={'test'}
          onChange={(event, newValue) => {
            handleChange(newValue)
          }}
          max={props.maxScore}
        />
        {value != null && <Typography> ??????????????????{value} ???</Typography>}
      </Grid>
    </Grid>
  )
}

function LocationDialog({ open, setOpen, confirm}) {
  return (
    <Dialog open={open}>
      <DialogTitle>??????</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ????????????????????????????????????
          <br />
          ?????????????????????????????????????????????
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false)
            confirm()
          }}
          color='primary'
        >
          ??????
        </Button>
        <Button
          onClick={() => {
            setOpen(false)
          }}
          color='primary'
        >
          ??????
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function Location(props) {
  const classes = useStyles()
  const [address, setAddress] = useState('')
  const [open, setOpen] = useState(false)

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
    <>
      <Grid
        container
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
        className={classes.Location}
      >
        {address === '' && (
          <Button color='primary' onClick={() => setOpen(true)} variant='outlined'>
            ????????????????????????
          </Button>
        )}
        {address !== '' && <Typography>???????????????{address}</Typography>}
      </Grid>
      <LocationDialog open={open} setOpen={setOpen} confirm={handleGetLocation}/>
    </>
  )
}

function Problem(props) {
  const classes = useStyles()
  const [quota, setQuota] = useState([-1])
  const { enqueueSnackbar } = useSnackbar()

  // function handleQuery() {
  //   surplus({ qid: props.problem.id }).then((res) => {
  //     // console.log(res.data);
  //     setQuota(res.data.surplus)
  //     console.log(quota)
  //   })
  // }

  const [lastTime, setTime] = useState(new Date().getSeconds() - 20)
  
  function handleQuery() {
    let now = new Date().getSeconds() - lastTime
    console.log(now)

    if (now < 20) {
      enqueueSnackbar('??????????????????' + (20 - now) + 's ?????????', {
        variant: 'warning',
      })
    } else {
      surplus({ qid: props.problem.id }).then((res) => {
        enqueueSnackbar('????????????', {variant: 'success'})
        setQuota(res.data.surplus)
        setTime(new Date().getSeconds())
      })
    }
  }

  useEffect(() => {
    console.log(props);
    if(isChoice(props.problem) && props.showquota && props.fillmode) {
      surplus({ qid: props.problem.id }).then((res) => {
        setQuota(res.data.surplus)
      })
    }
  }, [])

  // console.log(props)
  return (
    <Card className={classes.root} style={props.style}>
      <CardContent>
        <ShowClasses
          title={
            (props.showindex === true
              ? '??? ' + (props.problem.key + 1) + ' ??? '
              : '') + props.problem.title + (props.problem.ans > 0 ? (' ???' + props.problem.ans + ' ??????') : '')
          }
          must={props.problem.must}
        >
          {props.fillmode && isChoice(props.problem) && props.showquota && (
            <Button
              color='secondary'
              variant='contained'
              size='small'
              onClick={() => handleQuery()}
            >
              ????????????
            </Button>
          )}
        </ShowClasses>

        <Divider />
        <Typography className={classes.description}>
          {' '}
          {props.problem.description}
        </Typography>
        {isSingleChoice(props.problem) && (
          <SingleChoice {...props} quota={quota} />
        )}
        {isMultiChoice(props.problem) && (
          <MultiChoice {...props} quota={quota} />
        )}
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
          <ShowClasses title='??? 1 ??? zhe shi yi ge biao ti ' />
        </Skeleton>
        <Divider />
        <Skeleton>
          <Typography className={classes.description}>
            {' '}
            {'??????????????????????????????'}
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
  isChoice,
  ProblemSkeleton,
}
