import {
  Container,
  Typography,
  Grid,
  Paper,
  Divider,
  Button,
  Box,
} from '@material-ui/core'
import {
  getQuestionnaires,
  createQuestionnaire,
  search,
} from 'api/questionaire'
import { makeStyles } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'
import SearchInputButton from 'components/utils/SearchInputButton'
import QuestionnaireList from 'components/utils/QuestionnaireList'
import { useHistory } from 'react-router-dom'
import useTitle from 'hooks/useTitle'
import { useStateStore } from 'store'
import useRouteDefender from 'hooks/useRouteDefender'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    marginBottom: theme.spacing(3),
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
    color: '#FFFFFF',
  },
  headBar: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    fontSize: 22,
    alignItems: 'center',
  },
  headBarTitle: {
    textAlign: 'center',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  test: {
    backgroundColor: theme.palette.secondary.dark,
  },
}))

function SideBar() {
  const classes = useStyles()
  const history = useHistory()

  function handleCreate() {
    history.push('/picktype')
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
        <SearchInputButton {...props} />{' '}
      </Grid>
    </Grid>
  )
}

function Overview() {
  const classes = useStyles()
  const [change, setChange] = useState(0)
  const [data, setData] = useState([])
  const isLogin = useStateStore().isLogin

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
            status: res.data.questionnaires[i].state,
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
      search({ query: searchString }).then((res) => {
        console.log(res.data.message)
        var tmp = []
        for (let i = 0; i < res.data.message.length; ++i) {
          tmp.push({
            id: res.data.message[i].id,
            title: res.data.message[i].title,
            description: res.data.message[i].description,
            type: res.data.message[i].type,
            count: res.data.message[i].count,
            hash: res.data.message[i].hash,
            status: res.data.message[i].state,
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

  useRouteDefender({
    assert: !isLogin,
    method: 'push',
    to: '/signin',
    msg: '您还未登录，请先登录',
  })

  useTitle('问卷总览 - 问卷星球')

  useEffect(() => {
    if (isLogin) {
      getQuestionnaires().then((res) => {
        if (res.data.result === 1) {
          var tmp = []
          for (let i = 0; i < res.data.questionnaires.length; ++i) {
            tmp.push({
              id: res.data.questionnaires[i].id,
              title: res.data.questionnaires[i].title,
              description: res.data.questionnaires[i].description,
              type: res.data.questionnaires[i].type,
              count: res.data.questionnaires[i].count,
              hash: res.data.questionnaires[i].hash,
              status: res.data.questionnaires[i].state,
              createTime: res.data.questionnaires[i].create_time,
              uploadTime: res.data.questionnaires[i].upload_time,
              createNum: res.data.questionnaires[i].create_time_int,
              uploadNum: res.data.questionnaires[i].upload_time_int,
              key: '' + new Date().getTime() + res.data.questionnaires[i].id,
            })
          }
        }
        setData(tmp)
      })
    }
  }, [change])

  function handleChange() {
    let tmp = change ^ 1
    setChange(tmp)
  }

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
          <HeadBar search={handleSearch} />
        </Grid>
        <Grid item xs={12}>
          <QuestionnaireList
            Questionares={data}
            onChange={() => handleChange()}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Overview
