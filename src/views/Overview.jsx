import { Container, Typography, Grid, Paper, Divider, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchInputButton from "components/utils/SearchInputButton";
import QuestionnaireList from "components/utils/QuestionnaireList";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    flexGrow: 1,
  },
  sideBar: {
    paddingTop: theme.spacing(2),
  },
  sideBarContainer: {
    padding: 0,
  },
  sideBarContainerButton: {
    height: 60,
    fontSize: 24,
    fontWeight: 'bold',
  },
  headBar: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    fontSize: 22,
    alignItems: "center",
  },
  headBarTitle: {
    textAlign: 'center',
    color: theme.palette.primary.dark,
    fontWeight: 'bold'
  },
  test: {
    backgroundColor: theme.palette.secondary.dark,
  }
}));

function SideBar() {
  const classes = useStyles();

  return (
    <Container className={classes.sideBarContainer}>
      <Button variant="contained" color="primary" fullWidth className={classes.sideBarContainerButton}> +&nbsp;新建问卷 </Button>
    </Container>
  );
}

function HeadBar() {
  const classes = useStyles();
  return (
    <Grid container className={classes.headBar}>
      <Grid item className={classes.headBarTitle} xs={4}>问卷列表</Grid>
      <Grid item xs={8}> <SearchInputButton /> </Grid>
    </Grid>
  );
}

function Overview() {
  const classes = useStyles();
  return (
    <Container fixed className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={2}>
          <SideBar />
        </Grid>
        <Grid item xs={10}>
          <HeadBar />
        </Grid>
        <Grid item xs={12}>
          <QuestionnaireList />
        </Grid>
      </Grid>
    </Container>
  );  
}

export default Overview;
