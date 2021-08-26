import { Card, Grid, Container, Typography } from '@material-ui/core'
import useTitle from 'hooks/useTitle'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    textAlign: 'center',
    paddingBottom: theme.spacing(5),
  },
  card: {
    padding: theme.spacing(3),
  },
  title: {
    color: theme.palette.primary.main,
  },
  description: {
    color: theme.palette.primary.dark,
    textAlign: 'left',
    width: '80%',
  },
  problems: {
    minWidth: '90%',
  },
  divider: {
    height: theme.spacing(1),
  },
  buttons: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  test: {
    backgroundColor: theme.palette.secondary.main,
  },
}))

function Finish() {
  useTitle('填写已完成')

  const classes = useStyles()

  return (
    <>
      <Container maxWidth='md' className={classes.root}>
        <Card className={classes.card}>
          <Grid
            container
            direction='column'
            justifyContent='center'
            S
            alignItems='center'
            spacing={3}
          >
            <Grid item className={classes.title}>
              <Typography variant='h4'>填写完成</Typography>
            </Grid>
            <Grid item className={classes.description}>
              <Typography varient='h6'></Typography>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  )
}

export default Finish
