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

  useEffect(() => {
    let myInterval = setInterval(() => {
      const end_time = new Date(props.time);
      const now = new Date();
      const duration = Math.ceil((end_time.getTime() - now.getTime()) / 1000);
      const seconds = duration % 60;
      const min = Math.floor(duration / 60);
      if (duration > 0) {
        setContent('' + min + ' 分 ' + seconds + ' 秒');
      }
      if (duration == 0) {
        clearInterval(myInterval);
      }
    }, 1000)
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <Card className={classes.root}>
      <Typography className={classes.title}>剩余作答时间</Typography>
      <Divider />
      <Typography className={classes.content}>{content}</Typography>
    </Card>
  )
}
