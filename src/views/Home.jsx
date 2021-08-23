import { makeStyles } from '@material-ui/core/styles'
import banner from 'assets/banner.png'
import useTitle from 'hooks/useTitle'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '89vh',
    width: '99vw',
  },
}))

function Home() {
  const classes = useStyles()

  useTitle('首页 - 问卷星球')

  return <img src={banner} className={classes.root} alt='banner' />
}

export default Home
