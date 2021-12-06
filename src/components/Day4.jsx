import React, { useEffect, useState } from 'react';
import raw from '../files/day4.txt';
import { readFile } from '../utils';

const Day4 = () => {
  const [input, setInput] = useState();
  const [part, setPart] = useState();
  const [part1Result, setPart1Result] = useState();
  const [part2Result, setPart2Result] = useState();

  const common = () => {
    const drawNumbers = input[0].split(',');

    const blankIndexes = input
      .map((row, index) => ({ row, index }))
      .filter(({ row }) => row === '')
      .map(({ index }) => index);

    let bingoCards = [];

    blankIndexes.forEach((index) =>
      bingoCards.push(
        input.slice(index + 1, index + 6).map((row) =>
          row
            .trim()
            .split('  ')
            .map((item) => item.split(' '))
            .flat()
        )
      )
    );

    return { drawNumbers, bingoCards };
  };

  const findPart1Answer = () => {
    if (input) {
      let { drawNumbers, bingoCards } = common();

      let winner;
      let lastNumber;

      for (const number of drawNumbers) {
        bingoCards = bingoCards.map((card) =>
          card.map((row) => row.filter((cardNumber) => cardNumber !== number))
        );

        const winnerRow = bingoCards.filter((card) =>
          card.some((row) => row.length === 0)
        )?.[0];
        const winnerCol = bingoCards.filter((card) => {
          const cols = card[0].map((_, i) => card.map((row) => row[i]));
          return cols.some((col) => col.length === 0);
        })?.[0];

        winner = winnerRow || winnerCol;
        if (winner) {
          lastNumber = number;
          break;
        }
      }

      setPart1Result(
        lastNumber *
          winner.flat().reduce((total, num) => total + parseInt(num), 0)
      );
    }
  };

  const findPart2Answer = () => {
    if (input) {
      let { drawNumbers, bingoCards } = common();

      let lastWinner;
      let lastNumber;

      for (const number of drawNumbers) {
        const cardsWithNumber = bingoCards
          .map((card, index) => ({ card, index }))
          .filter(({ card }) => card.some((row) => row.includes(number)));

        bingoCards = bingoCards.map((card) =>
          card.map((row) =>
            row.map((cardNumber) => (cardNumber === number ? '' : cardNumber))
          )
        );

        const winnersRow = bingoCards
          .map((card, index) => ({
            card,
            index,
          }))
          .filter(({ card }) =>
            card.some(
              (row) => row.filter((number) => number !== '').length === 0
            )
          );

        const winnersCol = bingoCards
          .map((card, index) => ({
            card,
            index,
          }))
          .filter(({ card }) => {
            const cols = card[0].map((_, i) => card.map((row) => row[i]));
            return cols.some(
              (col) => col.filter((number) => number !== '').length === 0
            );
          });

        const winners = [...winnersRow, ...winnersCol];

        const indexesToRemove = winners.map(({ index }) => index);

        bingoCards = bingoCards.filter(
          (_, index) => !indexesToRemove.includes(index)
        );

        console.log(bingoCards);

        if (bingoCards.length === 0) {
          lastNumber = number;
          lastWinner = cardsWithNumber.map(({ card }) => card)[0];
          console.log(lastWinner);
          console.log(lastNumber);
          break;
        }
      }

      setPart2Result(
        lastNumber *
          lastWinner
            .flat()
            .filter((number) => number !== '' && number !== `${lastNumber}`)
            .reduce((total, num) => total + parseInt(num), 0)
      );
    }
  };

  useEffect(() => {
    if (part === 1) {
      findPart1Answer();
    }
    if (part === 2) {
      findPart2Answer();
    }
  }, [input]);

  const part1 = () => {
    setPart(1);
    readFile(raw, setInput);
  };

  const part2 = () => {
    setPart(2);
    readFile(raw, setInput);
  };

  return (
    <div>
      <br />
      Day 4
      <div className="flex">
        <button onClick={part1}>part 1</button>
        {part1Result && ` ${part1Result}`}
      </div>
      <div className="flex">
        <button onClick={part2}>part 2</button>
        {part2Result && ` ${part2Result}`}
      </div>
    </div>
  );
};

export default Day4;
