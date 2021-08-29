import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

export default function SearchInputButton(props) {
  const classes = useStyles()

  const [value, setValue] = useState('')
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  const search = (event) => {
    props.search(value)
  }

  return (
    <Paper component='span' className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder='搜索问卷'
        value={value}
        onChange={handleChange}
        onKeyDown={(event) => {
          if (event.code === 'Enter') {
            props.search(value)
          }
        }}
        inputProps={{ 'aria-label': '搜索问卷' }}
      />
      <IconButton
        type='submit'
        className={classes.iconButton}
        aria-label='search'
        onClick={search}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
