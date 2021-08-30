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
    height: '120px',
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    color: 'orange',
    fontSize: '1.5em',
    position: 'relative',
    top: '0.11em',
  },
}))

function ExamResult({ questions, stdAns, score, showType }) {
  const classes = useStyles()
  const [questionSet, setQuestionSet] = useState([])
  const [total, setTotal] = useState(0)

  console.log({ questions, stdAns, score })

  useEffect(() => {
    let data = []
    let stdAnsSet = stdAns.map((item) => item.problem_id)
    for (let i = 0; i < questions.length; ++i) {
      if (stdAnsSet.includes(questions[i].id)) {
        data.push({
          id: questions[i].id,
          key: i,
          description: questions[i].description,
          kind: questions[i].type,
          must: questions[i].is_required,
          title: questions[i].content,
          ans: questions[i].standard_answer.score,
          choices: questions[i].option,
          initialValue: stdAns.filter(
            (item) => questions[i].id === item.problem_id
          )[0].ans,
        })
      }
    }
    setQuestionSet(data)
    let total = 0
    questions.forEach((item) => {
      if (item.standard_answer !== undefined) {
        total += item.standard_answer.score
      }
    })
    setTotal(total)
  }, [questions, stdAns])

  return (
    <Box width='100%' display='flex' flexDirection='column' alignItems='center'>
      <Typography variant='h4' color='primary' className={classes.title}>
        {(showType === 'TESTING_SCORE' || showType === 'TESTING_BOTH') &&
          '试卷得分情况'}
      </Typography>
      {score !== undefined && (
        <Card className={classes.score}>
          <Typography variant='h5'>
            您的得分是： <span className={classes.scoreText}>{score}</span>
          </Typography>
          <Typography variant='h5'>
            试卷总分是： <span className={classes.scoreText}>{total}</span>
          </Typography>
        </Card>
      )}
      <Typography variant='h4' color='primary' className={classes.title}>
        {(showType === 'TESTING_SCORE' || showType === 'TESTING_BOTH') &&
          '试卷标准答案'}
      </Typography>
      {stdAns !== undefined && (
        <Box minWidth='45%'>
          {questionSet.map((problem) => (
            <Problem
              problem={problem}
              key={problem.key}
              updateAns={() => {}}
              style={{ marginTop: '16px' }}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default ExamResult
