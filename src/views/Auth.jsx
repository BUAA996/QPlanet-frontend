import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import banner from 'assets/banner.png'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    marginTop: '10vh',
    width: '28vw',
  },
  banner: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '89vh',
    width: '99vw',
    zIndex: -1,
  },
}))

function Auth({ form }) {
  const classes = useStyles()

  return (
    <>
      <img src={banner} className={classes.banner} alt='banner' />;
      <Container className={classes.root}>{form}</Container>
    </>
  )
}

export default Auth
