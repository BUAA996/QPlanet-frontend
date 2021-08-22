import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Completion from "components/feedback/Completion";
import Choice from "components/feedback/Choice";

const data = [
  {
    key: 1,
    kind: 1,
    type: "单选题",
    title: "标题",
    option: ["选项1", "选项2"],
    count: [3, 4],
    total: 7,
  },
  {
    key: 2,
    kind: 1,
    type: "多选题",
    title: "标题",
    option: ["选项1", "选项2", "选项3"],
    count: [4, 4, 4],
    total: 4,
  },
  {
    key: 3,
    kind: 2,
    type: "填空题",
    title: "标题",
    option: ["选项1", "选项2"],
    count: [3, 4],
    total: 7,
  },
  {
    key: 4,
    kind: 1,
    type: "评分题",
    title: "标题",
    option: ["0-1", "1-2", "2-3"],
    count: [3, 4, 7],
    total: 14,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
}));

function Feedback() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      {data.map((item) => {
        if (item.kind === 1) return <Choice data={item} key={item.key} />;
        else return <Completion data={item} key={item.key} />;
      })}
    </Container>
  );
}

export default Feedback;
