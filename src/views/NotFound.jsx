import { Box, Card, Typography, Button } from '@material-ui/core'
import useTitle from 'hooks/useTitle'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    height: '50vh',
    width: '30vw',
    marginTop: '12.5vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginTop: '15%',
  },
  subTitle: {
    marginTop: '7%',
  },
  btn: {
    marginTop: '12%',
  },
}))

function NotFound() {
  const classes = useStyles()
  const history = useHistory()

  useTitle('找不到网页')

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <Typography color='primary' variant='h2' className={classes.title}>
          <span style={{ color: 'orange' }}>404</span> NotFound
        </Typography>
        <Typography
          color='textSecondary'
          variant='h6'
          className={classes.subTitle}
        >
          啊呀，这里是问卷星球迷失的
          <span style={{ color: 'orange' }}>荒野</span>QAQ
        </Typography>
        <Typography
          color='textSecondary'
          variant='h6'
          className={classes.subTitle}
        >
          迷失的<span style={{ color: 'orange' }}>路人</span>
          ，进入下面这个传送门返程吧
        </Typography>
        <Button
          className={classes.btn}
          color='primary'
          variant='outlined'
          size='large'
          onClick={() => {
            history.goBack()
          }}
        >
          传送返程
        </Button>
      </Card>
    </Box>
  )
}

export default NotFound
