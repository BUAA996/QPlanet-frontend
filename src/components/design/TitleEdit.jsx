import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CreateRounded, Delete, AddCircleOutlineRounded } from '@material-ui/icons';
import { useState } from "react";
import TtitleEditDialog from "./dialog/TitleEditDialog";
import EditLayer from "./EditLayer";

const useStyle = makeStyles((theme) => ({
	editBtn: {
		margin: theme.spacing(1)
	}
}))

function TitleEdit(props) {
	const classes = useStyle();

	const [dialogOpen, setDialogOpen] = useState(false);


	const handleDialogOpen = () => {
		setDialogOpen(true);
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
	};

	const buttonList = [
		{
			id: 1,
			content: "编辑",
			icon: (<CreateRounded />),
			onClick: (() => handleDialogOpen())
		},
	].map((btn) =>
	(<Button
		className={classes.editBtn}
		variant="outlined"
		startIcon={btn.icon}
		key={btn.id}
		onClick={btn.onClick}
	>{btn.content}</Button>)
	)

	return (
		<>
		<EditLayer
			buttons={buttonList}
			content={props.content}
		/>
		<TtitleEditDialog 
			open={dialogOpen}
			// open={handleDialogOpenOpen}
			close={handleDialogClose}
		/>

		</>)

}

export default TitleEdit;