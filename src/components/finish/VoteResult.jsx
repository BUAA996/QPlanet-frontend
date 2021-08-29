import { makeStyles } from '@material-ui/core/styles'
import Graph from 'components/feedback/Graph'
import { Box, Card, Typography } from '@material-ui/core'

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

function VoteResult({ votes }) {
  const classes = useStyles()

  console.log(votes)

  return (
    <Box width='100%' display='flex' flexDirection='column' alignItems='center'>
      <Typography variant='h4' color='primary' className={classes.title}>
        当前投票结果
      </Typography>
      {votes.map((item) => {
        return (
          <Card key={item.problem_id} className={classes.itemCard}>
            <Typography variant='h5' className={classes.itemTitle}>
              {item.content}
            </Typography>
            <Box
              width='80%'
              height='300px'
              display='flex'
              justifyContent='center'
            >
              <Graph
                type={1}
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
      })}
    </Box>
  )
}

export default VoteResult
