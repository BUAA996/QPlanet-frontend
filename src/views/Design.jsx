import {makeStyles} from '@material-ui/core/styles'
import Problem, {ProblemSkeleton} from 'components/utils/Problem'
import {Container, Button, Card, Grid, Divider} from '@material-ui/core'
import MovableProblemEdit from 'components/design/MovableProblemEdit'
import {useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {getQuestionnaire, saveQuestionaire, transformGet} from 'api/design'
import {useEffect} from 'react'
import useTitle from 'hooks/useTitle'
import {isSingleChoice} from 'components/utils/Problem'
import {isMultiChoice} from 'components/utils/Problem'
import {Title} from 'views/Preview'
import FormDialog from 'components/design/FormDialog'
import {useStateStore} from 'store'
import useRouteDefender from 'hooks/useRouteDefender'

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
  buttons: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  test: {
    backgroundColor: theme.palette.secondary.main,
  },
}))

const Questionnaire = [
  {
    id: 1,
    kind: 0,
    must: 1,
    title: '第一题 balabalabalabala',
    choices: ['选项1', '选项2', '选项3', '选项4'],
  },
]

function Design(props) {
  const classes = useStyles()

  const {id} = useParams()
  const [title, setTitle] = useState()
  const [detail, setDetail] = useState()
  const [questionnaire, setQuestionnaire] = useState(null)
  const [qid, setQid] = useState()
  const [settings, setSettings] = useState()
  const [type, setType] = useState()
  const history = useHistory()
  const isLogin = useStateStore().isLogin


  useRouteDefender({
    assert: !isLogin,
    method: 'push',
    to: '/signin',
    msg: '您还未登录，请先登录',
  })

  useEffect(() => {
    if (isLogin) {
      let didCancel = false

      async function fetchMyAPI() {
        const res = await getQuestionnaire(id)
        if (res.data.result === 1) {
          const data = await transformGet(res.data);
          // console.log("get datas", data)
          setTitle(data.title)
          setDetail(data.detail)
          setQid(data.qid)
          setSettings(data.settings)
          setQuestionnaire(data.questions)
          setType(data.type)
        }

        // console.log(questionare)
        // if (!didCancel) { // Ignore if we started fetching something else
        //   // console.log(getQ);
        //   // console.log(data.questions)
        //   console.log("load again")
        // }
      }


      fetchMyAPI()
      return () => {
        didCancel = true
      } // Remember if we start fetching something else
    }
  }, [])

  const qHeadSetFunc = {
    setTitle: setTitle,
    setDetail: setDetail,
  }

  useTitle('问卷编辑 - 问卷星球')

  function addQuestion(index, item) {
    const newQ = questionnaire.slice()
    const newItem = JSON.parse(JSON.stringify(item))
    newItem.id = 'N' + Math.random().toString(36).slice(-6)
    if (index === -1) newQ.push(newItem)
    else newQ.splice(index, 0, newItem)
    setQuestionnaire(newQ)
  }

  function delQuestion(index) {
    const newQ = questionnaire.slice()
    newQ.splice(index, 1)
    setQuestionnaire(newQ)
  }

  function editQuestion(index, item) {
    const newQ = questionnaire.slice()
    newQ.splice(index, 1, item)
    setQuestionnaire(newQ)
  }

  function move(oriIndex, newIndex) {
    const item = questionnaire.slice()[oriIndex]
    const newQ = questionnaire.slice()
    newQ.splice(oriIndex, 1)
    newQ.splice(newIndex, 0, item)
    setQuestionnaire(newQ)
  }

  function addDefault(index) {
    const item = {
      kind: 0,
      must: 1,
      title: '题目',
      description: '',
      choices: ['选项1', '选项2', '选项3'],
    }
    addQuestion(index, item)
  }

  const content = <Title title={title} description={detail}/>

  function blankFunction() {
  }

  function save() {
    saveQuestionaire({
      modify_type: 'delete_all_results',
      qid: qid,
      title: title,
      description: detail,
      validity: '2021-8-23 18:20',
      limit_time: 998244353,
      questions: questionnaire.map((x) => {
        const item = {
          id: x.id,
          type: x.kind,
          content: x.title,
          is_required: x.must === 1,
          description: x.description,
        }
        if (isSingleChoice(x) || isMultiChoice(x)) item.option = x.choices
        return item
      }),
    })
    history.push('/overview')
  }

  return (
    <>
      <Container maxWidth='md' className={classes.root}>
        <Card className={classes.card}>
          <Grid
            container
            direction='column'
            justifyContent='center'
            alignItems='center'
            spacing={3}
          >
            <Title title={title} description={detail}/>

            <FormDialog
              title={title}
              type={type}
              description={detail}
              settings={settings}
              setTitle={setTitle}
              setDescription={setDetail}
              setSettings={setSettings}
            />

            <Divider
              flexItem={true}
              variant={'middle'}
              className={classes.divider}
            />
            <Grid item className={classes.problems}>
              {/*if questionnaire is null, display Skeleton*/}
              {questionnaire ? questionnaire.map((x, index) => (
                  <Problem
                    problem={x}
                    key={x.id}
                    updateAns={() => blankFunction()}
                  >
                    <MovableProblemEdit
                      key={x.id}
                      questionInfo={x}
                      index={index}
                      move={(newIndex) => move(index, newIndex)}
                      del={() => delQuestion(index)}
                      add={addQuestion}
                      edit={(item) => {
                        editQuestion(index, item)
                      }}
                    />
                  </Problem>
                )) :
                <ProblemSkeleton/>}
            </Grid>

            <Grid item className={classes.buttons}>
              <Button
                variant='contained'
                color='primary'
                onClick={() => addDefault(-1)}
                className={classes.buttons}
              >
                {' '}
                添加题目{' '}
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={() => save()}
                className={classes.buttons}
              >
                {' '}
                保存并返回{' '}
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={() => history.go(-1)}
                className={classes.buttons}
              >
                {' '}
                取消编辑{' '}
              </Button>
              {/* <Button variant='contained' color='secondary' onClick={() => print()} className={classes.buttons}> 打印 </Button> */}
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  )
}

export default Design
