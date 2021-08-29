import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography, Card } from '@material-ui/core'
import Problem from 'components/utils/Problem'
import { useEffect } from 'react'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(2),
  },
  score: {
    minWidth: '45%',
    height: '150px',
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

function ExamResult({ questions, stdAns, score }) {
  const classes = useStyles()
  const [questionSet, setQuestionSet] = useState([])

  console.log({ questions, stdAns, score })

  useEffect(() => {
    let data = []
    for (let i = 0; i < questions.length; ++i) {
      data.push({
        id: questions[i].id,
        key: i,
        description: questions[i].description,
        kind: questions[i].type,
        must: questions[i].is_required,
        title: questions[i].content,
        choices: questions[i].option,
      })
    }
    setQuestionSet(data)
  }, [questions])

  return (
    <Box width='100%' display='flex' flexDirection='column' alignItems='center'>
      <Typography variant='h4' color='primary' className={classes.title}>
        试卷反馈结果
      </Typography>
      {score !== undefined && (
        <Card className={classes.score}>
          <Typography>
            您的得分是：<span>{score}</span>
          </Typography>
        </Card>
      )}
      {questions !== undefined && (
        <Box minWidth='45%'>
          {questionSet.map((problem) => (
            <Problem problem={problem} key={problem.key} updateAns={() => {}} />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default ExamResult
