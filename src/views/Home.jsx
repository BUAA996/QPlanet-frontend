import { makeStyles } from '@material-ui/core/styles'
import banner from 'assets/banner.png'
import useTitle from 'hooks/useTitle'
import {
  Typography,
  Grid,
  Box,
  Collapse,
  Fade,
  Button,
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import form from 'assets/home_img/form.png'
import survey from 'assets/home_img/survey.png'
import test from 'assets/home_img/test.png'
import vote from 'assets/home_img/vote.png'
import { Waypoint } from 'react-waypoint'
import { useState } from 'react'
import { getTotal } from 'api/questionaire'
import { useEffect } from 'react'
import Apply from 'components/intro/Apply'
import Exam from 'components/intro/Exam'
import Survey from 'components/intro/Survey'
import Vote from 'components/intro/Vote'

const useStyles = makeStyles((theme) => ({
  home: {
    height: '90vh',
    backgroundImage: `url(${banner})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '99vw 90vh',
  },
  title: {
    marginTop: '10vh',
  },
  subTitle: {
    marginTop: '4vh',
  },
  pageLeft: {
    backgroundColor: theme.palette.background.default,
    width: '98vw',
    height: '58vh',
  },
  pageRight: {
    backgroundColor: theme.palette.background.paper,
    width: '98vw',
    height: '58vh',
  },
  cardTitle: {
    marginTop: '40%',
  },
  cardSubTitle: {
    marginTop: '6%',
  },
  cardBtn: {
    marginTop: '4%',
    color: 'white',
    fontSize: '1.1em',
  },
  '@keyframes upAndDown': {
    '0%': { color: theme.palette.grey[300] },
    '50%': { color: theme.palette.grey[800], marginTop: '10%' },
    '100%': { color: theme.palette.grey[300] },
  },
  expandMore: {
    animation: `$upAndDown 2500ms 200ms infinite`,
    marginTop: '8%',
  },
}))

function IntroCard({
  imgUrl,
  title,
  subTitle,
  btnTitle,
  position,
  callback,
  btnCallback,
}) {
  const classes = useStyles()
  const [needLoad, setNeedLoad] = useState(false)

  return (
    <>
      <Grid
        container
        justifyContent='center'
        className={position === 'left' ? classes.pageLeft : classes.pageRight}
      >
        <Grid
          xs={position === 'left' ? 4 : 6}
          item
          container
          justifyContent={position === 'left' ? 'flex-end' : 'center'}
          alignItems='center'
        >
          {position === 'left' ? (
            <Collapse in={needLoad} timeout={500}>
              <img src={imgUrl} alt={title} />
            </Collapse>
          ) : (
            <Box width='60%' height='100%'>
              <Collapse in={needLoad} timeout={800}>
                <Typography variant='h4' className={classes.cardTitle}>
                  {title}
                </Typography>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  className={classes.cardSubTitle}
                >
                  {subTitle}
                </Typography>
                <Button
                  variant='contained'
                  style={{
                    backgroundColor: 'orange',
                  }}
                  className={classes.cardBtn}
                  onClick={() => {
                    btnCallback()
                  }}
                >
                  {btnTitle}
                </Button>
              </Collapse>
            </Box>
          )}
        </Grid>
        <Grid
          xs={position !== 'left' ? 4 : 6}
          item
          container
          justifyContent={position !== 'left' ? 'flex-start' : 'center'}
          alignItems='center'
        >
          {position !== 'left' ? (
            <Collapse in={needLoad} timeout={500}>
              <img src={imgUrl} alt={title} />
            </Collapse>
          ) : (
            <Box width='60%' height='100%'>
              <Collapse in={needLoad} timeout={800}>
                <Typography variant='h4' className={classes.cardTitle}>
                  {title}
                </Typography>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  className={classes.cardSubTitle}
                >
                  {subTitle}
                </Typography>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.cardBtn}
                  onClick={() => {
                    btnCallback()
                  }}
                >
                  {btnTitle}
                </Button>
              </Collapse>
            </Box>
          )}
        </Grid>
      </Grid>
      <Waypoint
        bottomOffset='-100px'
        onEnter={({ currentPosition, previousPosition }) => {
          if (
            previousPosition === Waypoint.below &&
            currentPosition === Waypoint.inside
          ) {
            setNeedLoad(true)
            if (callback !== undefined) callback()
          }
        }}
      />
    </>
  )
}

function DataShow({ ...other }) {
  const [total, setTotal] = useState(0)
  const [release, setRelease] = useState(0)

  useEffect(() => {
    let isMounted = true
    getTotal().then((res) => {
      const gap = 30
      const cost = 2000
      const offset = 500
      setRelease(res.data.total)
      let id = setInterval(() => {
        if (isMounted) {
          setTotal((total) => {
            if (total < res.data.submit_total) {
              return total + Math.ceil((res.data.submit_total * gap) / cost)
            } else {
              return res.data.submit_total
            }
          })
        }
      }, gap)
      setTimeout(() => {
        if (isMounted) {
          clearInterval(id)
        }
      }, cost + offset)
    })
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      marginTop='45%'
    >
      <Typography variant='h6' color='textSecondary'>
        ??????????????????{' '}
        <span
          style={{ color: 'orange', fontWeight: 'bold', fontSize: '1.3em' }}
        >
          {release}
        </span>{' '}
        ???
      </Typography>
      <Typography
        variant='h6'
        color='textSecondary'
        style={{ marginTop: '5%' }}
      >
        ??????????????????{' '}
        <span
          style={{ color: 'orange', fontWeight: 'bold', fontSize: '1.3em' }}
        >
          {total}
        </span>{' '}
        ???
      </Typography>
    </Box>
  )
}

function Home() {
  const classes = useStyles()
  const [showIcon, setShowIcon] = useState(true)
  const [showApply, setShowApply] = useState(false)
  const [showVote, setShowVote] = useState(false)
  const [showExam, setShowExam] = useState(false)
  const [showSurvey, setShowSurvey] = useState(false)

  useTitle('?????? - ????????????')

  useEffect(() => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }, [])

  return (
    <>
      <Grid container className={classes.home} justifyContent='center'>
        <Grid
          item
          lg={6}
          md={4}
          sm={4}
          xs={4}
          container
          direction='column'
          alignItems='center'
        >
          <Typography className={classes.title} color='primary' variant='h3'>
            ??????????????????
            <span style={{ color: 'orange', fontSize: '1em' }}>???</span>??????
          </Typography>
          <Typography className={classes.subTitle} color='primary'>
            ??????????????????????????????????????????????????????????????????????????????
          </Typography>
          <DataShow />
          <Fade in={showIcon} timeout={2000}>
            <ExpandMore fontSize='large' className={classes.expandMore} />
          </Fade>
        </Grid>
      </Grid>
      <IntroCard
        position='left'
        imgUrl={survey}
        title='??????????????????"???"??????'
        subTitle='?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????'
        callback={() => {
          setShowIcon(false)
        }}
        btnTitle='??????????????????'
        btnCallback={() => {
          setShowSurvey(true)
        }}
      />
      <IntroCard
        position='right'
        imgUrl={test}
        title='?????????????????????????????????'
        subTitle='????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????'
        btnTitle='??????????????????'
        btnCallback={() => {
          setShowExam(true)
        }}
      />
      <IntroCard
        position='left'
        imgUrl={form}
        title='???????????????????????????'
        subTitle='?????????????????????????????????????????????????????????'
        btnTitle='??????????????????'
        btnCallback={() => {
          setShowApply(true)
        }}
      />
      <IntroCard
        position='right'
        imgUrl={vote}
        title='????????????????????????????????????'
        subTitle='??????????????????????????????????????????????????????????????????????????????'
        btnTitle='??????????????????'
        btnCallback={() => {
          setShowVote(true)
        }}
      />
      <Survey open={showSurvey} setOpen={setShowSurvey} />
      <Vote open={showVote} setOpen={setShowVote} />
      <Exam open={showExam} setOpen={setShowExam} />
      <Apply open={showApply} setOpen={setShowApply} />
    </>
  )
}

export default Home
