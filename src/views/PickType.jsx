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
          ??????
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
    msg: '??????????????????????????????',
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
            title='??????'
            word='???????????????????????????'
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
            title='??????'
            word='???????????????????????????'
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
            title='??????'
            word='???????????????????????????'
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
            title='??????'
            word='???????????????????????????'
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
            title='????????????'
            word='???????????????????????????'
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
            title='??????'
            word='???????????????????????????'
            url={other}
            onClick={() => {
              enqueueSnackbar('???????????????????????????...', { variant: 'success' })
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PickType
