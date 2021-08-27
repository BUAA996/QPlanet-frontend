import { makeStyles } from '@material-ui/core/styles'
import IntroTemplate from './IntroTemplate'

const useStyles = makeStyles((theme) => ({}))

function Apply({ open, setOpen }) {
  const classes = useStyles()

  return <IntroTemplate open={open} setOpen={setOpen} />
}

export default Apply
