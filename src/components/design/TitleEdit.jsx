import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CreateRounded, Delete, AddCircleOutlineRounded } from '@material-ui/icons';
import EditLayer from "./EditLayer";

const useStyle = makeStyles((theme) => ({
	editBtn: {
		margin: theme.spacing(1)
	}
}))

function TitleEdit(props) {
	const classes = useStyle();

	const buttonList = [
		{
			id: 1,
			content: "编辑",
			icon: (<CreateRounded />)
		},
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

export default TitleEdit;