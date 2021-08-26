import { makeStyles } from '@material-ui/core/styles'
import banner from 'assets/banner.png'
import useTitle from 'hooks/useTitle'
import { Typography, Grid, Box, Collapse } from '@material-ui/core'
import form from 'assets/home_img/form.png'
import survey from 'assets/home_img/survey.png'
import test from 'assets/home_img/test.png'
import vote from 'assets/home_img/vote.png'
import { Waypoint } from 'react-waypoint'
import { useState } from 'react'
import { useEffect } from 'react'

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
    width: '99vw',
    height: '58vh',
  },
  pageRight: {
    backgroundColor: theme.palette.background.paper,
    width: '99vw',
    height: '58vh',
  },
  cardTitle: {
    marginTop: '40%',
  },
  cardSubTitle: {
    marginTop: '10%',
  },
}))

function IntroCard({ imgUrl, title, subTitle, position }) {
  const classes = useStyles()
  const [needLoad, setNeedLoad] = useState(false)

  return (
    <>
      <Grid
        xs={12}
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
            <Collapse in={needLoad} timeout={400}>
              <img src={imgUrl} alt={title} />
            </Collapse>
          ) : (
            <Box width='60%' height='100%'>
              <Collapse in={needLoad} timeout={700}>
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
            <Collapse in={needLoad} timeout={400}>
              <img src={imgUrl} alt={title} />
            </Collapse>
          ) : (
            <Box width='60%' height='100%'>
              <Collapse in={needLoad} timeout={700}>
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
          }
        }}
      />
    </>
  )
}

function Home() {
  const classes = useStyles()

  useTitle('首页 - 问卷星球')

  useEffect(() => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }, [])

  return (
    <>
      <Grid xs={12} container className={classes.home} justifyContent='center'>
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
            问卷调查，从"星"开始
          </Typography>
          <Typography className={classes.subTitle} color='primary'>
            一分钟快速注册，即刻体验便捷的问卷调查与数据分析平台
          </Typography>
        </Grid>
      </Grid>
      <IntroCard
        position='left'
        imgUrl={survey}
        title='问卷调查，从"星"开始'
        subTitle='深度集成微信填写、问卷密码等功能，帮您轻松完成意向调查、满意度调查等各类在线问卷调查。'
      />
      <IntroCard
        position='right'
        imgUrl={test}
        title='十分钟搭建在线考试系统'
        subTitle='深度结合考试场景，在教学考试、业务考试等领域，问卷星球在线考试系统对您大有助益。'
      />
      <IntroCard
        position='left'
        imgUrl={form}
        title='报名表单，尽在掌握'
        subTitle='报名表单功能总是能让您的工作事半功倍。'
      />
      <IntroCard
        position='right'
        imgUrl={vote}
        title='简单易上手的在线投票平台'
        subTitle='准备好素材，分分钟就可以拥有一个强大的在线投票平台。'
      />
    </>
  )
}

export default Home
