import { makeStyles } from '@material-ui/core/styles'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import { useState } from 'react'
import { GetApp, Menu, MenuOpen } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'fixed',
    right: theme.spacing(10),
    bottom: theme.spacing(10),
  },
}))

function SpeedDialMenu({ actions, openIcon, icon, handleClick }) {
  const [open, setOpen] = useState(true)
  const classes = useStyles()

  return (
    <SpeedDial
      ariaLabel='button-menu'
      className={classes.speedDial}
      icon={<SpeedDialIcon icon={icon} openIcon={openIcon} />}
      onClose={(event, reason) => {
        if (reason === 'toggle') setOpen(false)
      }}
      onOpen={(event, reason) => {
        if (reason === 'toggle') setOpen(true)
      }}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => {
            handleClick(action.name)
          }}
        />
      ))}
    </SpeedDial>
  )
}

SpeedDialMenu.defaultProps = {
  actions: [{ icon: <GetApp />, name: '下载问卷' }],
  icon: <Menu />,
  openIcon: <MenuOpen />,
  handleClick: (name) => {
    if (name === '下载问卷') {
      console.log('点击了下载问卷')
    }
  },
}

export default SpeedDialMenu
