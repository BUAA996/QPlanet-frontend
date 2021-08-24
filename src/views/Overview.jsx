import {
  Container,
  Typography,
  Grid,
  Paper,
  Divider,
  Button,
  Box,
} from '@material-ui/core'
import { getQuestionnaires, createQuestionnaire, search } from 'api/questionaire'
import { makeStyles } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'
import SearchInputButton from 'components/utils/SearchInputButton'
import QuestionnaireList from 'components/utils/QuestionnaireList'
import { useHistory } from 'react-router-dom'
import useTitle from 'hooks/useTitle'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    flexGrow: 1,
  },
  sideBar: {
    paddingTop: theme.spacing(2),
  },
  sideBarContainer: {
    padding: 0,
  },
  sideBarContainerButton: {
    height: 60,
    fontSize: 24,
    fontWeight: 'bold',
  },
  headBar: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    fontSize: 22,
    alignItems: 'center',
  },
  headBarTitle: {
    textAlign: 'center',
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
  },
  test: {
    backgroundColor: theme.palette.secondary.dark,
  },
}))

// const TEMPLEATE = {
//   "title": "请修改标题",
//   "description": "感谢您能抽时间参与本次问卷，您的意见和建议就是我们前行的动力！",
//   "validity": 998244353,
//   "limit_time": 998244353,
//   "type": 0,
//   "questions": [],
// };

const TEMPLEATE = {
  "title": "123",
  "description": "感谢您能抽时间参与本次问卷，您的意见和建议就是我们前行的动力！",
  "validity": 998244353,
  "limit_time": 998244353,
  "type": 0,
  "questions":[
    {"type":0, "content": "What would you like to drink?", "is_required":true, "option":["Cola","Sprite","Lemonade"], "description":"" },
    {"type":1, "content": "What would you like to drink?", "is_required":true, "option":["Cola","Sprite","Lemonade"], "description": "hi" },
    {"type":2, "content": "How are you today?", "is_required":false, "description": "bye"},
    {"type":3, "content": "How are you today?", "is_required":false, "description": "bye"},
  ]
};


function SideBar() {
  const classes = useStyles()
  const history = useHistory()

  function handleCreate() {
    createQuestionnaire(TEMPLEATE).then((res) => {
      if (res.data.result == 1) {
        history.push('/design/' + res.data.hash)
      }
    })
  }

  return (
    <Container className={classes.sideBarContainer}>
      <Button
        variant='contained'
        color='primary'
        fullWidth
        className={classes.sideBarContainerButton}
        onClick={() => handleCreate()}
      >
        +&nbsp;新建问卷
      </Button>
    </Container>
  )
}

function HeadBar(props) {
  const classes = useStyles()
  return (
    <Grid container className={classes.headBar}>
      <Grid item className={classes.headBarTitle} xs={4}>
        问卷列表
      </Grid>
      <Grid item xs={8}>
        {' '}
        <SearchInputButton {...props}/>{' '}
      </Grid>
    </Grid>
  )
}

function Overview() {
  const classes = useStyles()
  const [change, setChange] = useState(0)
  const [data, setData] = useState([])

  function handleSearch(searchString) {
    if (searchString === '') {
      getQuestionnaires().then((res) => {
        var tmp = []
        for (let i = 0; i < res.data.questionnaires.length; ++i) {
          tmp.push({
            id: res.data.questionnaires[i].id,
            title: res.data.questionnaires[i].title,
            description: res.data.questionnaires[i].description,
            type: res.data.questionnaires[i].type,
            count: res.data.questionnaires[i].count,
            hash: res.data.questionnaires[i].hash,
            status: res.data.questionnaires[i].status,
            createTime: res.data.questionnaires[i].create_time,
            uploadTime: res.data.questionnaires[i].upload_time,
            createNum: res.data.questionnaires[i].create_time_int,
            uploadNum: res.data.questionnaires[i].upload_time_int,
            key: res.data.questionnaires[i].id,
          })
        }
        setData(tmp)
      })
    } else {
      search({query: searchString}).then((res) => {
        console.log(res.data.message);
        var tmp = []
        for (let i = 0; i < res.data.message.length; ++i) {
          tmp.push({
            id: res.data.message[i].id,
            title: res.data.message[i].title,
            description: res.data.message[i].description,
            type: res.data.message[i].type,
            count: res.data.message[i].count,
            hash: res.data.message[i].hash,
            status: res.data.message[i].status,
            createTime: res.data.message[i].create_time,
            uploadTime: res.data.message[i].upload_time,
            createNum: res.data.message[i].create_time_int,
            uploadNum: res.data.message[i].upload_time_int,
            key: res.data.message[i].id,
          })
        }
        setData(tmp)
      })
    }
  }

  useTitle('问卷总览 - 问卷星球')
  useEffect(() => {
    getQuestionnaires().then((res) => {
      var tmp = []
      for (let i = 0; i < res.data.questionnaires.length; ++i) {
        tmp.push({
          id: res.data.questionnaires[i].id,
          title: res.data.questionnaires[i].title,
          description: res.data.questionnaires[i].description,
          type: res.data.questionnaires[i].type,
          count: res.data.questionnaires[i].count,
          hash: res.data.questionnaires[i].hash,
          status: res.data.questionnaires[i].status,
          createTime: res.data.questionnaires[i].create_time,
          uploadTime: res.data.questionnaires[i].upload_time,
          createNum: res.data.questionnaires[i].create_time_int,
          uploadNum: res.data.questionnaires[i].upload_time_int,
          key: res.data.questionnaires[i].id,
        })
      }
      setData(tmp)
    })
  }, [change])
  return (
    <Container fixed className={classes.root}>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
      >
        <Grid item xs={2}>
          <SideBar />
        </Grid>
        <Grid item xs={10}>
          <HeadBar search={handleSearch}/>
        </Grid>
        <Grid item xs={12}>
          <QuestionnaireList Questionares={data} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Overview
