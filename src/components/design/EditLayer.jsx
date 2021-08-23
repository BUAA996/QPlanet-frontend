import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Backdrop } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Problem from 'components/utils/Problem'

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

  function blankFunction() {}
  
  useEffect(() => {
    console.log(props.problem);
  }, [])

  return (
    <Box
      // class={classes.box}
    // ref={hoverRef}
    >
      {props.buttons}
    </Box>
    
    // <Problem problem={props.problem} updateAns={() => blankFunction()}></Problem>
  )
}

export default EditLayer
