import {memo, useCallback, useState} from "react";
import {useDrop} from "react-dnd";
import {Card, Paper, Typography} from "@material-ui/core";
import {QuestionTitle} from "./card";
import {makeStyles} from "@material-ui/core/styles";

const ItemTypes = {
  CARD: 'card',
}

// export const Container = memo(function Container() {
//   const [cards, setCards] = useState();
//   const findCard = useCallback((id) => {
//     const card = cards.filter((c) => `${c.id}` === id)[0];
//     return {
//       card,
//       index: cards.indexOf(card),
//     };
//   }, [cards]);
//   const moveCard = useCallback((id, atIndex) => {
//     const {card, index} = findCard(id);
//     setCards(update(cards, {
//       $splice: [
//         [index, 1],
//         [atIndex, 0, card],
//       ],
//     }));
//   }, [findCard, cards, setCards]);
//   const [, drop] = useDrop(() => ({accept: ItemTypes.CARD}));
//   return (<div ref={drop}>
//     {cards.map((card) => (
//       <Card key={card.id} id={`${card.id}`} text={card.text} moveCard={moveCard} findCard={findCard}/>))}
//   </div>);
// });
const useStyles = makeStyles((theme) => ({
  outline: {
    width: "xs",
    background: theme.palette.background,
  }
}))

function Outline(props) {
  const classes = useStyles();

  return (

    <Card className={classes.outline}>
      <Paper>
        <Typography> 大纲</Typography>
      </Paper>
      {props.questions.map((x) => (<QuestionTitle question={x}/>))}

    </Card>
  )
}


export {ItemTypes, Outline};