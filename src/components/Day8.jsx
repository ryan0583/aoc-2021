import React, { useEffect, useState } from 'react';
import raw from '../files/day8.txt';
import { readFile } from '../utils';

const Day8 = () => {
  const [input, setInput] = useState();
  const [part, setPart] = useState();
  const [part1Result, setPart1Result] = useState();
  const [part2Result, setPart2Result] = useState();

  const findPart1Answer = () => {
    const outputs = input.map((row) => row.split(' | ')[1].split(' '));

    let foundCount = 0;

    outputs.forEach((output) =>
      output.forEach((str) => {
        if ([2, 3, 4, 7].includes(str.length)) foundCount = foundCount + 1;
      })
    );

    setPart1Result(foundCount);
  };

  const findPart2Answer = () => {
    const inputs = input.map((row) => row.split(' | ')[0].split(' '));
    const outputs = input.map((row) => row.split(' | ')[1].split(' '));

    const decoded = [];

    inputs.forEach((input) => {
      const decode = {};
      const oneStr = input.filter((str) => str.length === 2)[0];
      decode[oneStr] = 1;
      const fourStr = input.filter((str) => str.length === 4)[0];
      decode[fourStr] = 4;
      const sevenStr = input.filter((str) => str.length === 3)[0];
      decode[sevenStr] = 7;
      const eightStr = input.filter((str) => str.length === 7)[0];
      decode[eightStr] = 8;

      let threeStr;
      // 3
      input
        .filter((str) => str.length === 5)
        .forEach((str) => {
          if ([...sevenStr].every((c) => [...str].includes(c))) {
            threeStr = str;
            decode[str] = 3;
          }
        });

      const segmentTopLeft = [...fourStr].filter(
        (c) => ![...threeStr].includes(c)
      )[0];

      let fiveStr;
      let twoStr;
      // 5 and 2
      input
        .filter((str) => str.length === 5)
        .forEach((str) => {
          if ([...str].includes(segmentTopLeft)) {
            fiveStr = str;
            decode[str] = 5;
          } else if (![...str].every((c) => [...threeStr].includes(c))) {
            twoStr = str;
            decode[str] = 2;
          }
        });

      let zeroStr;
      let sixStr;
      let nineStr;
      // 0, 6, 9
      input
        .filter((str) => str.length === 6)
        .forEach((str) => {
          if (
            [...fiveStr].every((c) => [...str].includes(c)) &&
            ![...sevenStr].every((c) => [...str].includes(c))
          ) {
            sixStr = str;
            decode[str] = 6;
          } else if (
            [...sevenStr].every((c) => [...str].includes(c)) &&
            ![...fiveStr].every((c) => [...str].includes(c))
          ) {
            zeroStr = str;
            decode[str] = 0;
          } else {
            nineStr = str;
            decode[str] = 9;
          }
        });

      decoded.push(decode);
    });

    console.log(decoded);

    let outputSum = 0;

    outputs.forEach((output, index) => {
      const outputVal = [];
      output.forEach((numCode) => {
        const key = Object.keys(decoded[index]).filter(
          (str) =>
            numCode.length === str.length &&
            [...numCode].every((c) => [...str].includes(c))
        );

        if (outputVal.length > 0 || decoded[index][key] > 0)
          outputVal.push(decoded[index][key]);
      });
      console.log(parseInt(outputVal.join('')));
      outputSum = outputSum + parseInt(outputVal.join(''));
    });

    setPart2Result(outputSum);
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
      Day 8
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

export default Day8;
