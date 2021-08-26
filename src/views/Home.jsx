import { makeStyles } from '@material-ui/core/styles'
import banner from 'assets/banner.png'
import useTitle from 'hooks/useTitle'
import { Typography, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  page1: {
    height: '89vh',
    backgroundImage: `url(${banner})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '99vw 89vh',
  },
  title: {
    marginTop: '10vh',
  },
  subTitle: {
    marginTop: '4vh',
  },
  page2: {
    backgroundColor: theme.palette.background.default,
    width: '99vw',
    height: '50vh',
  },
}))

function Home() {
  const classes = useStyles()

  useTitle('首页 - 问卷星球')

  return (
    <>
      <Grid xs={12} container className={classes.page1} justifyContent='center'>
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
      <Grid xs={12} container className={classes.page2}></Grid>
      <Grid xs={12} container className={classes.page3}></Grid>
      <Grid xs={12} container className={classes.page4}></Grid>
    </>
  )
}

export default Home
