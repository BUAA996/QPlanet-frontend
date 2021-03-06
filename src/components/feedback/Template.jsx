import { makeStyles } from '@material-ui/core/styles'
import { Card, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  head: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: theme.spacing(1),
  },
  title: {
    marginRight: theme.spacing(1),
  },
  type: {
    color: theme.palette.text.secondary,
  },
  root: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
  },
}))

function Template({ title, type, children }) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <div className={classes.head}>
        <Typography variant='body1' className={classes.title}>
          {title}
        </Typography>
        <Typography variant='body1' className={classes.type}>
          {'[' + type + ']'}
        </Typography>
      </div>
      {children}
    </Card>
  )
}

Template.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Template
