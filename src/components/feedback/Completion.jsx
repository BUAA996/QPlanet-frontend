import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Template from './Template'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  btn: {
    marginRight: theme.spacing(1),
  },
}))

function DetailDialog() {
  return null
}

function FrequencyDialog() {
  return null
}

function Completion({ data }) {
  const classes = useStyles()

  return (
    <Template title={data.title} type={data.type}>
      <Button
        variant='outlined'
        className={classes.btn}
        color='primary'
        size='small'
      >
        查看详细信息
      </Button>
      <Button size='small' variant='outlined' color='primary'>
        词频分析
      </Button>
    </Template>
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
