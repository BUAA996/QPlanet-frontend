import { Card, Box, Typography, Button } from '@material-ui/core'
import useTitle from 'hooks/useTitle'
import { makeStyles } from '@material-ui/core/styles'
import success from 'assets/success.png'
import { useHistory, useLocation } from 'react-router-dom'
import { useState } from 'react'
import ExamResult from 'components/finish/ExamResult'
import VoteResult from 'components/finish/VoteResult'

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
    marginTop: theme.spacing(2),
  },
  img: {
    marginTop: '15%',
    height: '35%',
  },
  btn: {
    color: theme.palette.background.paper,
    marginRight: '2.5%',
    marginLeft: '2.5%',
  },
}))

function Finish() {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const [showDetail, setShowDetail] = useState(false)

  const { type, fillData, result } = location.state

  console.log({ type, fillData, result })
  useTitle('填写已完成')

  return (
    <>
      <Box className={classes.root}>
        {showDetail && ['VOTING_AFTER', 'VOTING_BOTH'].includes(type) && (
          <VoteResult votes={result.votes} />
        )}
        {showDetail &&
          ['TESTING_SCORE', 'TESTING_CORRECTION', 'TESTING_BOTH'].includes(
            type
          ) && <ExamResult />}
        {!showDetail && (
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
            <Box
              display='flex'
              justifyContent='center'
              width='100%'
              marginTop='10%'
              marginBottom='6%'
            >
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
              {[
                'VOTING_AFTER',
                'VOTING_BOTH',
                'TESTING_SCORE',
                'TESTING_CORRECTION',
                'TESTING_BOTH',
              ].includes(type) && (
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  onClick={() => {
                    setShowDetail(true)
                  }}
                  className={classes.btn}
                >
                  查看详情
                </Button>
              )}
            </Box>
          </Card>
        )}
      </Box>
    </>
  )
}

export default Finish
