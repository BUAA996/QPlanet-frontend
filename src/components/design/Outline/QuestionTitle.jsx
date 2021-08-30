import {memo} from "react";
import {useDrag, useDrop} from "react-dnd";
import {ItemTypes} from "./ItemTypes";
import {Card, Divider, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

// const style = {
//   // border: "1px dashed gray",
//   padding: "0.5rem 1rem",
//   marginBottom: ".5rem",
//   backgroundColor: "white",
//   width: 150,
//   cursor: "move"
// };

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "left",
    margin: theme.spacing(1)
  },
  word: {
    padding: theme.spacing(1),
    color: theme.palette.primary.dark,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export const QuestionTitle = memo(function QuestionTitle({id, idx, text, moveCard, findCard, move}) {
  const classes = useStyles();
  const originalIndex = findCard(id).index;
  const [{isDragging}, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: {id, originalIndex},
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
      end: (item, monitor) => {
        const {id: droppedId, originalIndex} = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      }
    }),
    [id, originalIndex, moveCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      canDrop: () => false,
      hover({id: draggedId}) {
        if (draggedId !== id) {
          const {index: overIndex} = findCard(id);
          moveCard(draggedId, overIndex);
        }
      }
    }),
    [findCard, moveCard]
  );
  const opacity = isDragging ? 0 : 1;
  return (
    <Card
      elevation={0}
      ref={(node) => drag(drop(node))}
      className={classes.root}
      // style={{...style, opacity}}
    >

      <Typography className={classes.word} variant="h6"> {idx + 1} {". "} {text} </Typography>
    </Card>
  );
});
