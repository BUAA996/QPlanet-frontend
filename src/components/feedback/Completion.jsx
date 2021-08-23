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
  Box,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { useState } from 'react'
import Graph from './Graph'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles((theme) => ({
  btn: {
    marginRight: theme.spacing(1),
  },
  closeBtn: {
    position: 'absolute',
    right: theme.spacing(1),
  },
}))

function DialogTemplate({ open, setOpen, title, children }) {
  const classes = useStyles()

  return (
    <Dialog open={open} maxWidth='md'>
      <Box display='flex' width={730} position='relative'>
        {' '}
        <DialogTitle>{title}</DialogTitle>
        <DialogActions className={classes.closeBtn}>
          <IconButton
            onClick={() => {
              setOpen(false)
            }}
          >
            <Close />
          </IconButton>
        </DialogActions>
      </Box>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

function DetailDialog({ open, setOpen, title }) {
  return (
    <DialogTemplate open={open} setOpen={setOpen} title={title}>
      <Box width='100%' height='300px' marginTop={1} marginBottom={2}></Box>
    </DialogTemplate>
  )
}

function ButtonSet({ index, setIndex }) {
  const classes = useStyles()

  return (
    <>
      <Button
        color='primary'
        className={classes.btn}
        variant={index === 5 ? 'contained' : 'outlined'}
        onClick={() => {
          setIndex(5)
        }}
      >
        词云图
      </Button>
      <Button
        color='primary'
        className={classes.btn}
        variant={index === 3 ? 'contained' : 'outlined'}
        onClick={() => {
          setIndex(3)
        }}
      >
        柱状图
      </Button>
      <Button
        color='primary'
        className={classes.btn}
        variant={index === 1 ? 'contained' : 'outlined'}
        onClick={() => {
          setIndex(1)
        }}
      >
        饼状图
      </Button>
      <Button
        color='primary'
        className={classes.btn}
        variant={index === 4 ? 'contained' : 'outlined'}
        onClick={() => {
          setIndex(4)
        }}
      >
        条形图
      </Button>
    </>
  )
}

function FrequencyDialog({ open, setOpen, data }) {
  const [index, setIndex] = useState(5)

  return (
    <DialogTemplate open={open} setOpen={setOpen} title='词频分析'>
      <Box display='flex' width='100%' justifyContent='center'>
        <ButtonSet index={index} setIndex={setIndex} />
      </Box>
      <Box width='100%' height='300px' marginTop={1} marginBottom={2}>
        <Graph type={index} data={data} />
      </Box>
    </DialogTemplate>
  )
}

function Completion({ data }) {
  // const classes = useStyles()
  const [detailOpen, setDetailOpen] = useState(false)
  const [frequencyOpen, setFrequencyOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  return (
    <>
      <Template title={data.title} type={data.type}>
        {/* <Button
          variant='outlined'
          className={classes.btn}
          color='primary'
          size='small'
          onClick={() => {
            setDetailOpen(true)
          }}
        >
          查看详细信息
        </Button> */}
        <Button
          size='small'
          variant='outlined'
          color='primary'
          onClick={() => {
            if (data.total === 0) {
              enqueueSnackbar('该题暂时还无人填写哦', { variant: 'warning' })
            } else {
              setFrequencyOpen(true)
            }
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
