import {memo, useCallback, useEffect, useState} from 'react';
import {useDrop} from 'react-dnd';
import {QuestionTitle} from './QuestionTitle';
import update from 'immutability-helper';
import {ItemTypes} from './ItemTypes';
import {Card, Paper} from "@material-ui/core";


export const Outline = memo(function Container({questions, move, setQuestions}) {
  const [cards, setCards] = useState(questions??[]);

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
  return (<Card ref={drop} >
    {cards.map((card) => (
      <QuestionTitle
        key={card.id}
        id={`${card.id}`}
        text={card.title}
        moveCard={moveCard}
        findCard={findCard}
        move={() => {
          setQuestions(cards)
        }}
      />))}
  </Card>);
});
