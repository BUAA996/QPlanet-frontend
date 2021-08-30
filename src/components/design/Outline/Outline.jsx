import {memo, useCallback, useEffect, useState} from 'react';
import {useDrop} from 'react-dnd';
import {QuestionTitle} from './QuestionTitle';
import update from 'immutability-helper';
import {ItemTypes} from './ItemTypes';
import {Card, Divider, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(1)
  },
  title: {
    color: theme.palette.primary.main,
    margin: theme.spacing(2)
  },
  paper: {
    // height: 140,
    width: theme.spacing(10),
    minWidth: theme.spacing(10),
    // background: "white"
  },
  control: {
    padding: theme.spacing(2),
  },
  divider: {
    height: theme.spacing(1),
  },
}));


export const Outline = memo(function Container({questions, move, setQuestions}) {
  const classes = useStyles();
  const [cards, setCards] = useState(questions ?? []);

  useEffect(() => {
    setCards(questions ?? [])
  }, [questions])

  useEffect(() => {
    setQuestions(cards)
  }, [cards])

  console.log("cards", cards)
  const findCard = useCallback((id) => {
    const card = cards.filter((c) => `${c.id}` === id)[0];
    return {
      card,
      index: cards.indexOf(card),
    };
  }, [cards]);
  const moveCard = useCallback((id, atIndex) => {
    const {card, index} = findCard(id);
    setCards(update(cards, {
      $splice: [
        [index, 1],
        [atIndex, 0, card],
      ],
    }));
  }, [findCard, cards, setCards]);
  const [, drop] = useDrop(() => ({accept: ItemTypes.CARD}));
  return (
    <Card
      className={classes.root}

      ref={drop}
      // raised={true}
    >

      <Card
        elevation={0}
      >
        <Typography
          variant="h5"
          className={classes.title}>
          问卷大纲 </Typography>
      </Card>

      <Divider
        flexItem={true}
        variant={'middle'}
        className={classes.divider}
      />

      {cards.map((card, index) => (
        <>
          <QuestionTitle
            key={card.id}
            id={`${card.id}`}
            idx={index}
            text={card.title}
            moveCard={moveCard}
            findCard={(id) => findCard(id)}
            move={() => {
              setQuestions(cards)
            }}
          />
          <Divider variant="middle"/>
        </>))}
    </Card>);
});
