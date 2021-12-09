import React, { useEffect, useState } from 'react';
import raw from '../files/day9.txt';
import { readFile } from '../utils';

const Day9 = () => {
  const [input, setInput] = useState();
  const [part, setPart] = useState();
  const [part1Result, setPart1Result] = useState();
  const [part2Result, setPart2Result] = useState();

  const findPart1Answer = () => {
    const rows = input.length;
    const cols = input[0].length;

    let lowPointSum = 0;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const val = input[y][x];

        const upVal = input[y - 1]?.[x];
        const rightVal = input[y][x + 1];
        const downVal = input[y + 1]?.[x];
        const leftVal = input[y][x - 1];

        if (
          (!upVal || val < upVal) &&
          (!rightVal || val < rightVal) &&
          (!downVal || val < downVal) &&
          (!leftVal || val < leftVal)
        ) {
          lowPointSum = lowPointSum + 1 + parseInt(val);
        }
      }
    }

    setPart1Result(lowPointSum);
  };

  const getNewPositionsToCheck = ({ x, y }) => {
    const upVal = input[y - 1]?.[x];
    const rightVal = input[y]?.[x + 1];
    const downVal = input[y + 1]?.[x];
    const leftVal = input[y]?.[x - 1];

    const newPositionsToCheck = [];
    if (upVal && upVal !== '9') {
      newPositionsToCheck.push({ x, y: y - 1 });
    }
    if (rightVal && rightVal !== '9') {
      newPositionsToCheck.push({ x: x + 1, y: y });
    }
    if (downVal && downVal !== '9') {
      newPositionsToCheck.push({ x, y: y + 1 });
    }
    if (leftVal && leftVal !== '9') {
      newPositionsToCheck.push({ x: x - 1, y });
    }

    return newPositionsToCheck;
  };

  const incrementBasinSize = (positionsToCheck, checkedPositions) => {
    const rows = input.length;
    const cols = input[0].length;
    let basinSizeIncrement = 0;

    positionsToCheck.forEach((position) => {
      if (
        !checkedPositions.some(
          ({ x, y }) => position.x === x && position.y === y
        ) &&
        position.y < rows &&
        position.y >= 0 &&
        position.x < cols &&
        position.x >= 0
      ) {
        checkedPositions.push(position);
        basinSizeIncrement = basinSizeIncrement + 1;

        const newPositionsToCheck = getNewPositionsToCheck(position);

        if (newPositionsToCheck.length > 0) {
          basinSizeIncrement =
            basinSizeIncrement +
            incrementBasinSize(newPositionsToCheck, checkedPositions);
        }
      }
    });

    return basinSizeIncrement;
  };

  const findPart2Answer = () => {
    const rows = input.length;
    const cols = input[0].length;

    const basinSizes = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const val = input[y][x];

        const upVal = input[y - 1]?.[x];
        const rightVal = input[y][x + 1];
        const downVal = input[y + 1]?.[x];
        const leftVal = input[y][x - 1];

        if (
          (!upVal || val < upVal) &&
          (!rightVal || val < rightVal) &&
          (!downVal || val < downVal) &&
          (!leftVal || val < leftVal)
        ) {
          const basinSize =
            1 +
            incrementBasinSize(getNewPositionsToCheck({ x, y }), [{ x, y }]);

          basinSizes.push(basinSize);
        }
      }
    }

    basinSizes.sort((a, b) => a - b);

    setPart2Result(basinSizes.slice(-3).reduce((acc, val) => acc * val, 1));
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
      Day 9
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

export default Day9;
