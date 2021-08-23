import { makeStyles } from '@material-ui/core/styles'
import useTitle from 'hooks/useTitle'

const useStyles = makeStyles((theme) => ({}))

function Preview() {
  const classes = useStyles()

  useTitle('问卷预览 - 问卷星球')

  return null
}

export default Preview
