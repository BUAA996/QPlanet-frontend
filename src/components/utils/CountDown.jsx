import { Card, Divider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.contrastText,
    padding: theme.spacing(1),
  },
  title: {},
  content: {
    fontSize: 14,
    color: 'red',
  },
}))

export default function CountDown(props) {
  const classes = useStyles()

  const [content, setContent] = useState('0 分 0 秒')

  function updateTime(end_time) {
    let time = Math.ceil((end_time.getTime() - new Date().getTime()) / 1000)
    let second = time % 60
    time = Math.floor(time / 60)
    let min = time
    if (time >= 0) {
      setContent(
        '' +
          (min < 10 ? '0' : '') +
          min +
          ' 分 ' +
          (second < 10 ? '0' : '') +
          second +
          ' 秒 '
      )
      setTimeout(() => updateTime(end_time), 1000)
    }
  }

  useEffect(() => {
    let time = new Date(props.time)
    time.setMinutes(time.getMinutes() + props.duration)
    updateTime(time)
  }, [props])

  return (
    <Card className={classes.root}>
      <Typography className={classes.title}>剩余作答时间</Typography>
      <Divider />
      <Typography className={classes.content}>{content}</Typography>
    </Card>
  )
}
