import React, { useEffect, useState } from 'react';
import raw from '../files/day7.txt';
import { readFile } from '../utils';

const Day7 = () => {
  const [input, setInput] = useState();
  const [part, setPart] = useState();
  const [part1Result, setPart1Result] = useState();
  const [part2Result, setPart2Result] = useState();

  const common = () => {
    console.log(input);
    const xPositions = input[0].split(',');
    console.log(xPositions);

    const minPos = Math.min(...xPositions);
    const maxPos = Math.max(...xPositions);

    return { xPositions, minPos, maxPos };
  };

  const findPart1Answer = () => {
    const { xPositions, minPos, maxPos } = common();

    let bestTotalFuel;

    for (let commonPos = minPos; commonPos <= maxPos; commonPos++) {
      console.log(commonPos);
      let totalFuel = 0;
      for (const pos of xPositions) {
        totalFuel = totalFuel + Math.abs(pos - commonPos);
      }
      if (!bestTotalFuel || totalFuel < bestTotalFuel) {
        bestTotalFuel = totalFuel;
      }
    }

    setPart1Result(bestTotalFuel);
  };

  const findPart2Answer = () => {
    const { xPositions, minPos, maxPos } = common();

    let bestTotalFuel;

    for (let commonPos = minPos; commonPos <= maxPos; commonPos++) {
      console.log(commonPos);
      let totalFuel = 0;
      for (const pos of xPositions) {
        const numSteps = Math.abs(pos - commonPos);
        const thisTotalFuel = (numSteps * (numSteps + 1)) / 2;
        totalFuel = totalFuel + thisTotalFuel;
      }
      if (!bestTotalFuel || totalFuel < bestTotalFuel) {
        bestTotalFuel = totalFuel;
      }
    }

    setPart2Result(bestTotalFuel);
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
      Day 7
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

export default Day7;
