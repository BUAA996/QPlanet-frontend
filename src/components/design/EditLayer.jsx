import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Backdrop } from '@material-ui/core'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  hoverLayer: {
    position: 'relative',
    boxSizing: 'border-box',
  },
  box: {
    overflow: 'hidden',
  },
  btnRow: {
    position: 'absolute',
    right: '50px',
    bottom: '20px',
  },
}))

function EditLayer(props) {
  const classes = useStyles()
  // const [hoverRef, isHovered] = useHover();
  const [open, setOpen] = useState()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box
      class={classes.box}
    // ref={hoverRef}
    >
      <div className={classes.hoverLayer}>
        <div className={classes.btnRow}>{props.buttons}</div>

        {props.content}
      </div>
    </Box>
  )
}

export default EditLayer
