import { Container } from '@material-ui/core'
import useTitle from 'hooks/useTitle'
import { Title, PreviewPage } from 'views/Preview'
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

function NotFound() {
  const classes = useStyles()

  useTitle('找不到网页')

  const title = (
    <Title
      title='404 NotFound'
      description='啊呀，问卷走丢了QAQ。请检查问卷链接，或者与问卷发布者联系。'
    />
  )

  return (
    <>
      <Container maxWidth='md' className={classes.root}>
        <PreviewPage title={title} />
      </Container>
    </>
  )
}

export default NotFound
