import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CreateRounded, Delete, AddCircleOutlineRounded} from '@material-ui/icons';
import EditLayer from "./EditLayer";

const useStyle = makeStyles((theme) => ({
  editBtn: {
    margin: theme.spacing(1)
  }
}))

function ProblemEdit(props) {
  const classes = useStyle();

  const buttonList = [
    {
      id: 1,
      content: "编辑",
      icon: (<CreateRounded />)
    },
     {
      id: 2,
      content: "删除",
      icon: (<Delete />)
    }, 
    {
      id: 3,
      content: "上方插入",
      icon: (<AddCircleOutlineRounded />)
    }
  ].map((btn) => 
    (<Button
      className={classes.editBtn}
      variant="outlined"
      startIcon={btn.icon}
      key={btn.id}
    >{btn.content}</Button>)
  )

  return (
    <EditLayer
      buttons={buttonList}
      content={props.content}
    />)

}

export default ProblemEdit;