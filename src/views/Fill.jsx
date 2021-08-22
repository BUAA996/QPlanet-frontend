import { Button, Card, Container, Divider, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Problem from "components/utils/Problem";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    textAlign: 'center',
    paddingBottom: theme.spacing(5)
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
    width: '80%'
  },
  problems: {
    minWidth: '90%',
  },
  divider: {
    height: theme.spacing(1),
  },
  buttons: {

  }
}));

function Fill() {
  const classes = useStyles();
  const title = '假装这个是一个非常完美的问卷';
  const description = '假装这个问卷有一个非常完美的description: 感谢您能抽时间参与本次问卷，您的意见和建议就是我们前行的动力！感谢您能抽时间参与本次问卷，您的意见和建议就是我们前行的动力！';
  const Questionare = [
    {
      id: 1,
      kind: 0,
      must: 1,
      title: '第一题 balabalabalabala',
      choices: [
        '选项1',
        '选项2',
        '选项3',
        '选项4',
      ]
    },
    {
      id: 2,
      kind: 1,
      must: 1,
      title: '第二题 balabalabalabala',
      choices: [
        '选项1',
        '选项2',
        '选项3',
        '选项4',
      ]
    },
    {
      id: 3,
      kind: 2,
      must: 0,
      title: '第三题',
      choices: []
    },
    {
      id: 4,
      kind: 1,
      must: 0,
      title: '第四题',
      choices: [
        '选项1',
        '选项2',
        '选项3',
        '选项4',
      ]
    },
    {
      id: 5,
      kind: 2,
      must: 1,
      title: '第五题',
      choices: [
        '选项1',
        '选项2',
        '选项3',
        '选项4',
      ]
    },
  ];

  return (
    <Container maxWidth='md' className={classes.root}>
      <Card className={classes.card}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item className={classes.title}>
            <Typography variant='h4'>
              {title}
            </Typography>
          </Grid>
          <Grid item className={classes.description}>
            <Typography varient='h6'>
              {description}
            </Typography>
          </Grid>
          <Divider flexItem={true} variant={'middle'} className={classes.divider} />
          <Grid item className={classes.problems}>
            {Questionare.map((problem) => <Problem problem={problem}/>)}
          </Grid>
          <Grid item className={classes.buttons}>
            <Button variant='contained' color='secondary'> 提交 </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default Fill;
