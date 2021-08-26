import { Card, Box, Typography, Button } from '@material-ui/core'
import useTitle from 'hooks/useTitle'
import { makeStyles } from '@material-ui/core/styles'
import success from 'assets/success.png'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '99vw',
    height: '89vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  card: {
    width: '36vw',
    height: '60vh',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '8vh',
  },
  title: {
    marginTop: '5%',
  },
  word: {
    marginTop: '2%',
  },
  img: {
    marginTop: '15%',
    height: '35%',
  },
  btn: {
    color: theme.palette.background.paper,
    marginTop: '6%',
  },
}))

function Finish() {
  const classes = useStyles()
  const history = useHistory()

  useTitle('填写已完成')

  return (
    <>
      <Box className={classes.root}>
        <Card className={classes.card}>
          <img src={success} alt='填写完成' className={classes.img} />
          <Typography
            variant='h5'
            color='textPrimary'
            className={classes.title}
          >
            提交成功
          </Typography>
          <Typography
            variant='body1'
            color='textSecondary'
            className={classes.word}
          >
            问卷到此结束，感谢您的参与
          </Typography>
          <Button
            variant='contained'
            color='primary'
            size='large'
            onClick={() => {
              history.push('/')
            }}
            className={classes.btn}
          >
            返回首页
          </Button>
        </Card>
      </Box>
    </>
  )
}

export default Finish
