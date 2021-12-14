import React, { useEffect, useState } from 'react';
import raw from '../files/day14.txt';
import { readFile } from '../utils';

const Day14 = () => {
  const [input, setInput] = useState();
  const [part, setPart] = useState();
  const [part1Result, setPart1Result] = useState();
  const [part2Result, setPart2Result] = useState();

  const performStep = (pairs, replacements) => {
    const newPairs = {};

    Object.keys(pairs).forEach((pair) => {
      if (replacements[pair]) {
        newPairs[`${pair.slice(0, 1)}${replacements[pair]}`] = newPairs[
          `${pair.slice(0, 1)}${replacements[pair]}`
        ]
          ? newPairs[`${pair.slice(0, 1)}${replacements[pair]}`] + pairs[pair]
          : pairs[pair];

        newPairs[`${replacements[pair]}${pair.slice(1)}`] = newPairs[
          `${replacements[pair]}${pair.slice(1)}`
        ]
          ? newPairs[`${replacements[pair]}${pair.slice(1)}`] + pairs[pair]
          : pairs[pair];
      } else {
        newPairs[pair] = pairs[pair];
      }
    });
    return newPairs;
  };

  const common = (steps, setFn) => {
    console.log(input);

    const replacements = input
      .filter((row) => row.includes('->'))
      .reduce((acc, row) => {
        const separatorIndex = row.indexOf(' -> ');
        const searchStr = row.slice(0, separatorIndex);
        const replacementStr = row.slice(separatorIndex + 4);
        return {
          ...acc,
          [searchStr]: replacementStr,
        };
      }, {});
    let polymerTemplate = input[0].split('');

    let pairs = polymerTemplate.reduce((acc, val, index) => {
      const newObj = { ...acc };
      if (polymerTemplate[index - 1]) {
        newObj[`${polymerTemplate[index - 1]}${val}`] = acc[
          `${polymerTemplate[index - 1]}${val}`
        ]
          ? acc[`${polymerTemplate[index - 1]}${val}`] + 1
          : 1;
      }

      return newObj;
    }, {});

    let step = 0;

    while (step < steps) {
      console.log(step);
      pairs = performStep(pairs, replacements);

      step = step + 1;
    }

    const charCounts = Object.keys(pairs).reduce(
      (acc, pair) => ({
        ...acc,
        [pair.slice(1)]: (acc[pair.slice(1)] || 0) + pairs[pair],
      }),
      {}
    );

    const max = Math.max(...Object.values(charCounts));
    const min = Math.min(...Object.values(charCounts));

    setFn(max - min);
  };

  const findPart1Answer = () => {
    common(10, setPart1Result);
  };

  const findPart2Answer = () => {
    common(40, setPart2Result);
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
      Day 14
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

export default Day14;
