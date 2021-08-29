import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography, Card } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(2),
  },
}))

function ExamResult({ questions, stdAns, score }) {
  const classes = useStyles()

  console.log({ questions, stdAns, score })

  return (
    <Box width='100%' display='flex' flexDirection='column' alignItems='center'>
      <Typography variant='h4' color='primary' className={classes.title}>
        试卷反馈结果
      </Typography>
      <Card></Card>
      <Card></Card>
    </Box>
  )
}

export default ExamResult
