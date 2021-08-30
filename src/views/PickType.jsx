import { makeStyles } from '@material-ui/core/styles'
import useRouteDefender from 'hooks/useRouteDefender'
import { useStateStore } from 'store'
import { Card, Grid, Typography, Box } from '@material-ui/core'
import exam from 'assets/questionnaire_type/exam.png'
import form from 'assets/questionnaire_type/form.png'
import survey from 'assets/questionnaire_type/survey.png'
import vote from 'assets/questionnaire_type/vote.png'
import other from 'assets/questionnaire_type/other.png'
import clock from 'assets/questionnaire_type/clock.png'
import { useState } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import { createQuestionnaire } from 'api/questionaire'
import { SURVEY, EXAM, FORM, VOTE, CLOCK } from 'template.js'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles((theme) => ({
  cardBoxLeft: {
    marginTop: '5vh',
    height: '79vh',
    position: 'relative',
    right: '-3.5vw',
  },
  cardBoxCenter: {
    marginTop: '5vh',
    height: '79vh',
  },
  cardBoxRight: {
    marginTop: '5vh',
    height: '79vh',
    position: 'relative',
    left: '-3.5vw',
  },
  card: {
    height: '35vh',
    width: '80%',
    marginTop: '3vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer',
  },
  img: {
    height: '45%',
  },
  title: {
    marginTop: '2%',
    fontWeight: 'bold',
  },
  titleHover: {
    color: theme.palette.text.secondary,
  },
  word: {
    marginTop: '6%',
  },
  wordHover: {
    fontWeight: 'bold',
    position: 'absolute',
    width: '90%',
    height: '6vh',
    textAlign: 'center',
    lineHeight: '6vh',
    backgroundColor: 'rgb(230,245,251)',
    color: 'rgb(0, 149, 255)',
    bottom: '2.5vh',
  },
}))

function TypeCard({ url, title, word, ...other }) {
  const classes = useStyles()
  const [hover, setHover] = useState(false)

  return (
    <Card
      className={classes.card}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      {...other}
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        <img src={url} alt={title} className={classes.img} />
        <Typography
          variant='h6'
          className={clsx(classes.title, hover && classes.titleHover)}
        >
          {title}
        </Typography>
        <Typography
          variant='body2'
          color='textSecondary'
          className={classes.word}
        >
          {word}
        </Typography>
      </Box>
      {hover && (
        <Typography variant='h6' className={classes.wordHover}>
          创建
        </Typography>
      )}
    </Card>
  )
}

function PickType() {
  const classes = useStyles()
  const isLogin = useStateStore().isLogin
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  useRouteDefender({
    assert: !isLogin,
    to: '/signin',
    method: 'push',
    msg: '您还未登录，请先登录',
  })

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={9} container justifyContent='space-evenly'>
        <Grid
          item
          xs={4}
          container
          alignItems='center'
          direction='column'
          className={classes.cardBoxLeft}
        >
          <TypeCard
            title='调查'
            word='丰富题型，强大逻辑'
            url={survey}
            onClick={() => {
              createQuestionnaire(SURVEY).then((res) => {
                if (res.data.result === 1) {
                  history.push('/design/' + res.data.hash)
                }
              })
            }}
          />
          <TypeCard
            title='投票'
            word='实时计算，便捷投票'
            url={vote}
            onClick={() => {
              createQuestionnaire(VOTE).then((res) => {
                if (res.data.result === 1) {
                  history.push('/design/' + res.data.hash)
                }
              })
            }}
          />
        </Grid>
        <Grid
          item
          xs={4}
          container
          alignItems='center'
          direction='column'
          className={classes.cardBoxCenter}
        >
          <TypeCard
            title='报名'
            word='活动报名，快捷登记'
            url={form}
            onClick={() => {
              createQuestionnaire(FORM).then((res) => {
                if (res.data.result === 1) {
                  history.push('/design/' + res.data.hash)
                }
              })
            }}
          />
          <TypeCard
            title='考试'
            word='限时作答，自动阅卷'
            url={exam}
            onClick={() => {
              createQuestionnaire(EXAM).then((res) => {
                if (res.data.result === 1) {
                  history.push('/design/' + res.data.hash)
                }
              })
            }}
          />
        </Grid>
        <Grid
          item
          xs={4}
          container
          alignItems='center'
          direction='column'
          className={classes.cardBoxRight}
        >
          <TypeCard
            title='疫情打卡'
            word='每日上报，一键导出'
            url={clock}
            onClick={() => {
              createQuestionnaire(CLOCK).then((res) => {
                if (res.data.result === 1) {
                  history.push('/design/' + res.data.hash)
                }
              })
            }}
          />
          <TypeCard
            title='其他'
            word='更多问卷，敬请期待'
            url={other}
            onClick={() => {
              enqueueSnackbar('更多问卷正在制作中...', { variant: 'success' })
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PickType
