import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Template from './Template'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  btn: {
    marginRight: theme.spacing(1),
  },
}))

function DetailDialog({ open, setOpen, title }) {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <IconButton
          onClick={() => {
            setOpen(false)
          }}
        >
          <Close />
        </IconButton>
      </DialogActions>
      <DialogContent></DialogContent>
    </Dialog>
  )
}

function FrequencyDialog({ open, setOpen, data }) {
  return (
    <Dialog open={open}>
      <DialogTitle>词频分析</DialogTitle>
      <DialogActions>
        <IconButton
          onClick={() => {
            setOpen(false)
          }}
        >
          <Close />
        </IconButton>
      </DialogActions>
      <DialogContent></DialogContent>
    </Dialog>
  )
}

function Completion({ data }) {
  const classes = useStyles()
  const [detailOpen, setDetailOpen] = useState(false)
  const [frequencyOpen, setFrequencyOpen] = useState(false)

  return (
    <>
      <Template title={data.title} type={data.type}>
        <Button
          variant='outlined'
          className={classes.btn}
          color='primary'
          size='small'
          onClick={() => {
            setDetailOpen(true)
          }}
        >
          查看详细信息
        </Button>
        <Button
          size='small'
          variant='outlined'
          color='primary'
          onClick={() => {
            setFrequencyOpen(true)
          }}
        >
          词频分析
        </Button>
      </Template>
      <DetailDialog
        open={detailOpen}
        setOpen={setDetailOpen}
        title={data.title}
      />
      <FrequencyDialog
        open={frequencyOpen}
        setOpen={setFrequencyOpen}
        data={data}
      />
    </>
  )
}

Completion.propTypes = {
  props: PropTypes.shape({
    choice: PropTypes.arrayOf(PropTypes.string),
    count: PropTypes.arrayOf(PropTypes.number),
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
}

export default Completion
