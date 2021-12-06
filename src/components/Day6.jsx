import React, { useEffect, useState } from 'react';
import raw from '../files/day6.txt';
import { readFile } from '../utils';

const Day6 = () => {
  const [input, setInput] = useState();
  const [part, setPart] = useState();
  const [part1Result, setPart1Result] = useState();
  const [part2Result, setPart2Result] = useState();

  const getAns = (maxDays, setFn) => {
    const ages = input[0].split(',').map((num) => parseInt(num));

    let fishes = ages.reduce((acc, val) => {
      if (!acc[val]) {
        acc[val] = 0;
      }
      acc[val] = acc[val] + 1;
      return acc;
    }, {});

    let day = 1;
    while (day <= maxDays) {
      console.log(day);
      const newFishes = {};
      for (const daysRemaining of Object.keys(fishes)) {
        if (parseInt(daysRemaining) === 0) {
          newFishes[6] = newFishes?.[6] || 0 + fishes[daysRemaining];
          newFishes[8] = newFishes?.[8] || 0 + fishes[daysRemaining];
        } else {
          newFishes[parseInt(daysRemaining) - 1] =
            (newFishes[parseInt(daysRemaining) - 1] || 0) +
            fishes[daysRemaining];
        }
      }
      fishes = newFishes;
      day = day + 1;
    }

    console.log(fishes);

    setFn(Object.values(fishes).reduce((acc, val) => acc + val, 0));
  };

  const findPart1Answer = () => getAns(80, setPart1Result);

  const findPart2Answer = () => getAns(256, setPart2Result);

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
      Day 6
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

export default Day6;
