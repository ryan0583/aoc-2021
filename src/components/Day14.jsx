import React, { useEffect, useState } from 'react';
import raw from '../files/day14.txt';
import { readFile } from '../utils';

const Day14 = () => {
  const [input, setInput] = useState();
  const [part, setPart] = useState();
  const [part1Result, setPart1Result] = useState();
  const [part2Result, setPart2Result] = useState();

  const performStep = (polymerTemplate, replacements) => {
    const newPolymerTemplate = [polymerTemplate[0]];

    polymerTemplate.forEach((c, index) => {
      if (index > 0) {
        const searchStr = `${polymerTemplate[index - 1]}${c}`;
        const additionalChar = replacements[searchStr];
        if (additionalChar) {
          newPolymerTemplate.push(additionalChar);
        }
        newPolymerTemplate.push(c);
      }
    });
    return newPolymerTemplate;
  };

  const findPart1Answer = () => {
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

    console.log(polymerTemplate);
    console.log(replacements);

    let step = 0;

    while (step < 40) {
      console.log(step);
      polymerTemplate = performStep(polymerTemplate, replacements);

      step = step + 1;
    }

    const charCounts = polymerTemplate.reduce(
      (acc, c) => ({
        ...acc,
        [c]: (acc[c] || 0) + 1,
      }),
      {}
    );

    console.log(Object.values(charCounts));

    const max = Math.max(...Object.values(charCounts));
    const min = Math.min(...Object.values(charCounts));

    console.log(max);

    setPart1Result(max - min);
  };

  const findPart2Answer = () => {
    console.log(input);
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
        {part1Result && `${part1Result}`}
      </div>
      <div className="flex">
        <button onClick={part2}>part 2</button>
        {part2Result && `${part2Result}`}
      </div>
    </div>
  );
};

export default Day14;
