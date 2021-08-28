import { makeStyles } from '@material-ui/core/styles'
import { Card, TextField, MenuItem, Box } from '@material-ui/core'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(7.7),
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
}))

function Cross({ qid, choice }) {
  const classes = useStyles()
  const [first, setFirst] = useState('')
  const [second, setSecond] = useState('')

  return (
    <Card className={classes.root}>
      <Box>
        <TextField
          select
          label='自变量'
          value={first}
          onChange={(event) => {
            setFirst(event.target.value)
          }}
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
        >
          {choice.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.content}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Card>
  )
}

export default Cross
