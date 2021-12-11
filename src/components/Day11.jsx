import React, { useEffect, useState } from 'react';
import raw from '../files/day11.txt';
import { readFile } from '../utils';

const Day11 = () => {
  const [input, setInput] = useState();
  const [part, setPart] = useState();
  const [part1Result, setPart1Result] = useState();
  const [part2Result, setPart2Result] = useState();

  const logStuff = (positionValMap, size) => {
    const keys = Object.keys(positionValMap);
    keys.sort((a, b) => parseInt(a.slice(-1)) - parseInt(b.slice(-1)));

    for (let i = 0; i < size; i++) {
      console.log(
        keys
          .filter((key) => parseInt(key.slice(-1)) === i)
          .reduce((acc, key) => `${acc} ${positionValMap[key]}`, '')
      );
    }
  };

  const findFlashedCoords = (keys, positionValMap, flashedCoords) => {
    const adjacentCoords = keys
      .map((key) => [
        `${parseInt(key.slice(0, 1))},${parseInt(key.slice(-1)) - 1}`,
        `${parseInt(key.slice(0, 1)) + 1},${parseInt(key.slice(-1)) - 1}`,
        `${parseInt(key.slice(0, 1)) + 1},${parseInt(key.slice(-1))}`,
        `${parseInt(key.slice(0, 1)) + 1},${parseInt(key.slice(-1)) + 1}`,
        `${parseInt(key.slice(0, 1))},${parseInt(key.slice(-1)) + 1}`,
        `${parseInt(key.slice(0, 1)) - 1},${parseInt(key.slice(-1)) + 1}`,
        `${parseInt(key.slice(0, 1)) - 1},${parseInt(key.slice(-1))}`,
        `${parseInt(key.slice(0, 1)) - 1},${parseInt(key.slice(-1)) - 1}`,
      ])
      .flat()
      .filter((key) => !key.includes('10') && !key.includes('-'))
      .filter((key) => !flashedCoords.includes(key));

    // increment values for adjacent coords by 1...
    adjacentCoords.forEach((key) => {
      positionValMap[key] = positionValMap[key] + 1;
    });

    // find keys where the value is above 9...
    const above9Keys = Object.entries(positionValMap)
      .filter(([_, value]) => value > 9)
      .map(([key, _]) => key);

    //reset values for these to zero
    above9Keys.forEach((key) => (positionValMap[key] = 0));

    if (above9Keys.length > 0) {
      findFlashedCoords(above9Keys, positionValMap, [
        ...flashedCoords,
        ...above9Keys,
      ]);
    }
  };

  const performStep = (positionValMap) => {
    const newPositionValueMap = { ...positionValMap };

    // increment all values by 1...
    Object.keys(newPositionValueMap).forEach(
      (key) => (newPositionValueMap[key] = newPositionValueMap[key] + 1)
    );

    // find keys where the value is above 9...
    const above9Keys = Object.entries(newPositionValueMap)
      .filter(([_, value]) => value > 9)
      .map(([key, _]) => key);

    //reset values for these to zero
    above9Keys.forEach((key) => (newPositionValueMap[key] = 0));

    findFlashedCoords(above9Keys, newPositionValueMap, [...above9Keys]);

    return newPositionValueMap;
  };

  const findPart1Answer = () => {
    let positionValMap = {};
    input.forEach((row, y) =>
      [...row].forEach(
        (val, x) => (positionValMap[`${x},${y}`] = parseInt(val))
      )
    );

    let step = 0;
    let totalFlashed = 0;

    while (step < 100) {
      positionValMap = performStep(positionValMap);
      totalFlashed =
        totalFlashed +
        Object.values(positionValMap).filter((val) => parseInt(val) === 0)
          .length;
      step = step + 1;
    }

    setPart1Result(totalFlashed);
  };

  const findPart2Answer = () => {
    let positionValMap = {};
    input.forEach((row, y) =>
      [...row].forEach(
        (val, x) => (positionValMap[`${x},${y}`] = parseInt(val))
      )
    );

    let step = 0;
    let allFlashed = false;

    while (!allFlashed) {
      positionValMap = performStep(positionValMap);
      allFlashed = Object.values(positionValMap).every(
        (val) => parseInt(val) === 0
      );
      step = step + 1;
    }

    setPart2Result(step);
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
      Day 11
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

export default Day11;
