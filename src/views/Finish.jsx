import { Card, Box, Typography, Button } from '@material-ui/core'
import useTitle from 'hooks/useTitle'
import { makeStyles } from '@material-ui/core/styles'
import success from 'assets/success.png'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '99vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  card: {
    width: '36vw',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(8),
  },
  title: {
    marginTop: theme.spacing(4),
  },
  word: {
    marginTop: theme.spacing(4),
  },
  img: {
    marginTop: '15%',
    height: '35%',
  },
  btn: {
    color: theme.palette.background.paper,
    marginTop: '6%',
    marginBottom: theme.spacing(4)
  },
}))

const FORM_LEVEL = ['NORMAL', 'VOTING_BEFORE', 'VOTING_AFTER', 'VOTING_BOTH', 'VOTING_NO', 'SIGNUP', 'TESTING_SCORE', 'TESTING_CORRECTION', 'TESTING_BOTH', 'TESTING_NO']

function Finish(props) {
  const classes = useStyles()
  const history = useHistory()

  const type = props.type

  console.log(props)
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

          {
            type !== "NORMAL" && type !== 'VOTING_NO' && type !== 'TESTING_NO' && type !== "SIGNUP" && 
            <>
              <Typography
                variant='h5'
                color='textPrimary'
                className={classes.title}
              >
                在这里显示一堆奇怪的问卷结果（X
              </Typography>
              {
                (type === 'VOTING_AFTER' || type === 'VOTING_BOTH') && 
                <Typography
                  variant='body1'
                  color='textSecondary'
                  className={classes.word}
                >
                  这里大概需要展示投票结果
                </Typography>
              }
              {
                (type === 'TESTING_SCORE' || type === 'TESTING_BOTH') && 
                <Typography
                  variant='body1'
                  color='textSecondary'
                  className={classes.word}
                >
                  这里大概需要展示考试得分
                </Typography>
              }
              {
                (type === 'TESTING_CORRECTION' || type === 'TESTING_BOTH') && 
                <Typography
                  variant='body1'
                  color='textSecondary'
                  className={classes.word}
                >
                  这里大概需要展示考试答案
                </Typography>
              }
            </>
          }


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
