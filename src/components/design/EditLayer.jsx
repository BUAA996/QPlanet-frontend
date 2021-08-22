import { makeStyles } from "@material-ui/core/styles";
import useHover from "components/global/useHover";
import { Box, Button, Backdrop } from "@material-ui/core"
import { SpeedDial, SpeedDialIcon } from '@material-ui/lab';
import { useState } from "react";
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  hoverLayer: {
    position: "relative",
    boxSizing: "border-box",
  },
  box: {
    overflow: "hidden",
  },
  btnRow: {
    position: "absolute",
    right: "50px",
    bottom: "20px",
  },
}));

function EditLayer(props) {
  const classes = useStyles();
  const [hoverRef, isHovered] = useHover();
  const [open, setOpen] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (<Box
    class={classes.box}
    ref={hoverRef}
  >
    <div
      className={classes.hoverLayer}>
      <div className={classes.btnRow}>
        {props.buttons}
        {/* {isHovered ? <Button
          className={classes.btn}
          variant="contained"
          color="primary"
        > butn</Button> : null} */}
        {/* {[<Button
          className={classes.btn}
          variant="contained"
          color="primary"
        >butn</Button>, <Button
          className={classes.btn}
          variant="contained"
          color="primary"
        >butn</Button>]} */}
        {/* <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.btn}
        direction="left"
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >

      </SpeedDial> */}
      </div>

      {props.content}
    </div>
  </Box>)
}

export default EditLayer;