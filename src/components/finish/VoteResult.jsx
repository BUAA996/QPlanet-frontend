import { makeStyles } from '@material-ui/core/styles'
import Graph from 'components/feedback/Graph'
import { Box, Card, Typography, Button } from '@material-ui/core'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  itemCard: {
    width: '40vw',
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemTitle: {
    marginTop: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(2),
  },
}))

function VoteCard({ item }) {
  const classes = useStyles()
  const [graphNum, setGraphNum] = useState(1)

  return (
    <Card key={item.problem_id} className={classes.itemCard}>
      <Typography variant='h5' className={classes.itemTitle}>
        {item.content}
      </Typography>
      <Box
        display='flex'
        justifyContent='space-evenly'
        width='65%'
        marginTop='2%'
      >
        <Button
          color='primary'
          variant={graphNum === 1 ? 'contained' : 'outlined'}
          onClick={() => {
            setGraphNum(1)
          }}
        >
          饼状图
        </Button>
        <Button
          color='primary'
          variant={graphNum === 2 ? 'contained' : 'outlined'}
          onClick={() => {
            setGraphNum(2)
          }}
        >
          圆环图
        </Button>
        <Button
          color='primary'
          variant={graphNum === 3 ? 'contained' : 'outlined'}
          onClick={() => {
            setGraphNum(3)
          }}
        >
          柱状图
        </Button>
        <Button
          color='primary'
          variant={graphNum === 4 ? 'contained' : 'outlined'}
          onClick={() => {
            setGraphNum(4)
          }}
        >
          条形图
        </Button>
      </Box>
      <Box
        width='80%'
        height='300px'
        display='flex'
        justifyContent='center'
        marginTop='2%'
      >
        <Graph
          type={graphNum}
          data={{
            title: item.content,
            choice: item.option.map((item1, index1) => {
              return {
                option: item1,
                count: item.result[index1],
              }
            }),
          }}
        />
      </Box>
    </Card>
  )
}

function VoteResult({ votes }) {
  const classes = useStyles()

  return (
    <Box width='100%' display='flex' flexDirection='column' alignItems='center'>
      <Typography variant='h4' color='primary' className={classes.title}>
        当前投票结果
      </Typography>
      {votes.map((item) => {
        return <VoteCard key={item.problem_id} item={item} />
      })}
    </Box>
  )
}

export default VoteResult
