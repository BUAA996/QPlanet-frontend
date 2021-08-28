import { makeStyles } from '@material-ui/core/styles'
import { Card, TextField, MenuItem, Box, Button } from '@material-ui/core'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(7.7),
    padding: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '& .MuiButton-containedPrimary': {
      color: 'white',
      fontSize: '1.03em',
    },
  },
  input: {
    width: '48%',
  },
}))

function Cross({ qid, choice }) {
  const classes = useStyles()
  const [first, setFirst] = useState('')
  const [second, setSecond] = useState('')
  const [showGraph, setShowGraph] = useState(false)

  return (
    <Card className={classes.root}>
      <Box width='100%' display='flex' justifyContent='space-between'>
        <TextField
          select
          label='自变量'
          value={first}
          onChange={(event) => {
            setFirst(event.target.value)
          }}
          className={classes.input}
        >
          {choice.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.content}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label='因变量'
          value={second}
          onChange={(event) => {
            setSecond(event.target.value)
          }}
          className={classes.input}
        >
          {choice.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.content}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box
        display='flex'
        width='100%'
        marginTop='3.5%'
        justifyContent='space-between'
      >
        <Button
          color='primary'
          variant='contained'
          onClick={() => {
            setShowGraph((showGraph) => !showGraph)
          }}
        >
          交叉分析
        </Button>
        {showGraph && (
          <>
            <Button color='primary' variant='contained'>
              表格
            </Button>
            <Button color='primary' variant='contained'>
              柱状图
            </Button>
            <Button color='primary' variant='contained'>
              条形图
            </Button>
            <Button color='primary' variant='contained'>
              雷达图
            </Button>
            <Button color='primary' variant='contained'>
              折线图
            </Button>
          </>
        )}
      </Box>
    </Card>
  )
}

export default Cross
