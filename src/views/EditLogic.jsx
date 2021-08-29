import {
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  Typography,
} from '@material-ui/core'
import { savelogic, view } from 'api/questionaire'
import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Problem from 'components/utils/Problem'
import useTitle from 'hooks/useTitle'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { isChoice } from 'components/utils/Problem'
import { color } from 'echarts/core'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    textAlign: 'center',
    paddingBottom: theme.spacing(5),
  },
  card: {
    padding: theme.spacing(3),
  },
  title: {
    color: theme.palette.primary.main,
  },
  description: {
    color: theme.palette.primary.dark,
    textAlign: 'left',
    width: '80%',
  },
  problems: {
    minWidth: '90%',
  },
  divider: {
    height: theme.spacing(1),
  },
  loginForm: {
    marginBottom: theme.spacing(4)
  },
  warning: {
    color: 'red',
  },
  textfield: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  formBtn: {
    borderRadius: theme.shape.borderRadius * 8,
    height: '50px',
    marginTop: theme.spacing(1),
    color: 'white',
    fontSize: '1.2em',
  },
  hint: {
    color: theme.palette.text.secondary
  },
  btn: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  red: {
    fontWeight: 'bold',
    color: 'red'
  },
  select: {
    textOverflow: 'ellipsis',
  }
}))

function LogicField(props) {

  const classes = useStyles();
  const title = isChoice(props.problem) ? '选项 ' + (props.index + 1) + ' 跳转' : '选择后跳转'
  const [nextProblem, setNextProblem] = useState(props.problem.logic.nextProblem[props.index] == -1 ? '' : props.problem.logic.nextProblem[props.index]);
  const [list, setList] = useState([]);

  const handleChange = (event) => {
    setNextProblem(event.target.value);
    props.handleChange(event.target.value);
  };

  useEffect(() => {
    let tmp = [];
    for (let i = props.self + 1; i < props.total; ++i) {
      tmp.push(i); 
    }
    setList(tmp)
  }, [])

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{title}</InputLabel>
      <Select
        value={nextProblem}
        onChange={handleChange}
      >
        {list.map((value) => <MenuItem value={value} key={value}>第 {value + 1} 题: {props.allProblem[value].title}</MenuItem>)}
        <MenuItem value={-1}>不跳转</MenuItem>
      </Select>
    </FormControl>
  );
}

function Fields(props) {
  const classes = useStyles();
  // console.log(props.problem.logic.nextProblem)

  // const list = props.problem.logic.nextProblem.map((value, index) => (
  //   <Grid item xs={3} key={props.problem.id + '' + index}>
  //     <LogicField 
  //       index={index} 
  //       problem={props.problem}
  //       handleChange={(next) => props.handleChange(index, next) }
  //       total={props.total}
  //       self={props.self}
  //     />
  //   </Grid>
  // ))


  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      {/* {list} */}
      { props.problem.logic.nextProblem !== undefined && 
        props.problem.logic.nextProblem.map((value, index) => (
          <Grid item xs={3} key={props.problem.id + '' + index}>
            <LogicField 
              index={index} 
              problem={props.problem}
              handleChange={(next) => props.handleChange(index, next) }
              total={props.total}
              self={props.self}
              allProblem={props.allProblem}
            />
          </Grid>
        ))
      }
    </Grid>
  );
}

export default function EditLogic(props) {
  useTitle('编辑逻辑 - 问卷星球')

  const classes = useStyles()
  const [questionID, setID] = useState(-1)
  const [title, setTitle] = useState('')
  const [Questionare, setQuestionare] = useState([])
  const [description, setDescription] = useState('')
  const [ansList, setAns] = useState([])
  const { id } = useParams()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [data, setData] = useState({})

  useEffect(() => {
    view({ hash: id }).then((res) => {
      // console.log(res);
      setData(res.data);
      if (res.data.result === 1) {
        const ori = res.data.questions
        const settings = res.data
        let tmp = []
        for (let i = 0; i < ori.length; ++i) {
          tmp.push({
            id: ori[i].id,
            key: i,
            description: ori[i].description,
            kind: ori[i].type,
            must: ori[i].is_required,
            title: ori[i].content,
            choices: ori[i].option,
            quota: ori[i].quota,
            count: ori[i].count,
            logic: ori[i].logic === undefined ? {nextProblem: [-1] } : ori[i].logic
          })
        }
        setQuestionare([].concat(tmp))
        setTitle(settings.title)
        setDescription(settings.description)
        setID(settings.qid)

        tmp = new Array(ori.length)
        for (let i = 0; i < ori.length; ++i) {
          tmp[i] = {
            problem_id: ori[i].id,
            type: ori[i].type,
            answer: [''],
          }
        }
        setAns(tmp)
      } else {
        // enqueueSnackbar(res.data.message, {variant: "warning"});
        history.push('/404/')
      }
    })
  }, [])
  
  function handleAns(id, singleAns) {
    let tmp = [].concat(ansList)
    tmp[id] = {
      problem_id: tmp[id].problem_id,
      type: tmp[id].type,
      answer: singleAns,
    }
    setAns(tmp)
    // console.log(tmp)
  }

  function handleClick() { 
    let tmp = []
    Questionare.map((problem) => (
      tmp.push({
        qid: problem.id,
        logic: {nextProblems: problem.logic.nextProblem},
      })
    ))
    // console.log(tmp);
    savelogic({hash: id, questions: tmp}).then((res) => {
      // console.log(res);
      enqueueSnackbar('保存成功', {variant: 'success'})
      history.push('/overview');
    })
  }

  function hanldeLogicChange(problemIndex, choiceIndex, nextProblem) {
    let tmp = Questionare.slice();
    tmp[problemIndex].logic.nextProblem[choiceIndex] = nextProblem;
    setQuestionare(tmp);
    // console.log(tmp);
  }

  return (
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='flex-start'
      className={classes.root}
    >
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <Container maxWidth='md'>
          <Card className={classes.card}>
            <Grid
              container
              direction='column'
              justifyContent='center'
              alignItems='center'
              spacing={3}
            >
              <Grid item className={classes.hint}>
                <Typography varient='h6'>本页面仅限于修改跳题逻辑，编辑完成后如果题目发生了修改，则跳题逻辑也会被<span className={classes.red}>清空</span></Typography>
              </Grid>
              <Grid item className={classes.hint}>
                <Typography varient='h6'>如果因为跳题而导致必做题无法填写，其后果用户<span className={classes.red}>自行承担</span></Typography>
              </Grid>
              <Grid item className={classes.hint}>
                <Typography varient='h6'>以下内容为您的原始问卷</Typography>
              </Grid>
              <Grid item className={classes.title}>
                <Typography variant='h4'>{title}</Typography>
              </Grid>
              <Grid item className={classes.description}>
                <Typography varient='h6'>{description}</Typography>
              </Grid>
              <Divider flexItem={true} variant={'middle'} className={classes.divider} />
              <Grid item className={classes.problems}>
                {Questionare.map((problem, index) => (
                  <Problem
                    problem={problem}
                    showindex={data.show_number}
                    fillmode={true}
                    updateAns={(ans) => handleAns(problem.key, ans)}
                    key={problem.id}
                  >
                      { 
                        index !== Questionare.length - 1 && 
                        <Fields 
                          problem={problem} 
                          handleChange={(choice, next) => hanldeLogicChange(index, choice, next)}
                          total={Questionare.length}
                          self={index}
                          allProblem={Questionare}
                        />
                      }
                  </Problem>
                ))}
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={() => handleClick()}
                  className={classes.btn}
                >
                  保存
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  )
}