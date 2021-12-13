import React, { useEffect, useState } from 'react';
import raw from '../files/day13.txt';
import { readFile } from '../utils';
import Grid from './Grid';

const Day13 = () => {
  const [input, setInput] = useState();
  const [part, setPart] = useState();
  const [part1Result, setPart1Result] = useState();
  const [part2Result, setPart2Result] = useState();

  const performFold = (index, folds, points) => {
    const fold = folds[index];
    const equalsIndex = fold.indexOf('=');
    const foldKey = fold.slice(equalsIndex - 1, equalsIndex);
    const foldValue = parseInt(fold.slice(equalsIndex + 1));

    const foldedPoints = points.map((point) => ({
      x:
        foldKey === 'x' && point.x > foldValue
          ? Math.abs(2 * foldValue - point.x)
          : point.x,
      y:
        foldKey === 'y' && point.y > foldValue
          ? Math.abs(2 * foldValue - point.y)
          : point.y,
    }));

    const foldedStrings = [
      ...new Set(foldedPoints.map((point) => `${point.x},${point.y}`)),
    ];

    const newPoints = foldedStrings.map((row) => {
      const commaIndex = row.indexOf(',');
      return {
        x: parseInt(row.slice(0, commaIndex)),
        y: parseInt(row.slice(commaIndex + 1)),
      };
    });

    return newPoints;
  };

  const findPart1Answer = () => {
    console.log(input);

    const points = input
      .filter((row) => row !== '' && !row.includes('fold'))
      .map((row) => {
        const commaIndex = row.indexOf(',');
        return {
          x: parseInt(row.slice(0, commaIndex)),
          y: parseInt(row.slice(commaIndex + 1)),
        };
      });

    const folds = input.filter((row) => row.includes('fold'));

    let updatedPoints = performFold(0, folds, points);

    setPart1Result(updatedPoints.length);
  };

  const findPart2Answer = () => {
    console.log(input);

    const points = input
      .filter((row) => row !== '' && !row.includes('fold'))
      .map((row) => {
        const commaIndex = row.indexOf(',');
        return {
          x: parseInt(row.slice(0, commaIndex)),
          y: parseInt(row.slice(commaIndex + 1)),
        };
      });

    const folds = input.filter((row) => row.includes('fold'));

    let updatedPoints = points;

    folds.forEach((_, index) => {
      updatedPoints = performFold(index, folds, updatedPoints);
    });

    console.log(updatedPoints.map((point) => `${point.x},${point.y}`));

    setPart2Result(updatedPoints);
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
      Day 13
      <div className="flex">
        <button onClick={part1}>part 1</button>
        {part1Result && ` ${part1Result}`}
      </div>
      <div className="flex">
        <button onClick={part2}>part 2</button>
        {part2Result && <Grid points={part2Result} />}
      </div>
    </div>
  );
};

export default Day13;
