import React, { useEffect, useState } from 'react';
import raw from '../files/day10.txt';
import { readFile } from '../utils';

const Day10 = () => {
  const [input, setInput] = useState();
  const [part, setPart] = useState();
  const [part1Result, setPart1Result] = useState();
  const [part2Result, setPart2Result] = useState();

  const bracketMap = {
    ['(']: ')',
    ['{']: '}',
    ['<']: '>',
    ['[']: ']',
  };

  const scoreMap = {
    [')']: 1,
    [']']: 2,
    ['}']: 3,
    ['>']: 4,
  };

  const findPart1Answer = () => {
    console.log(input);

    const invalids = [];

    input.forEach((row) => {
      const openBrackets = [];
      for (let i = 0; i < row.length; i++) {
        const char = row[i];
        const lastOpenBracket = openBrackets.slice(-1)[0];

        if (char === '(' || char === '{' || char === '<' || char === '[') {
          openBrackets.push(char);
        } else if (
          (char === ')' && lastOpenBracket !== '(') ||
          (char === '}' && lastOpenBracket !== '{') ||
          (char === '>' && lastOpenBracket !== '<') ||
          (char === ']' && lastOpenBracket !== '[')
        ) {
          invalids.push(char);
          break;
        } else {
          openBrackets.pop();
        }
      }
    });

    let total =
      invalids.filter((val) => val === ')').length * 3 +
      invalids.filter((val) => val === ']').length * 57 +
      invalids.filter((val) => val === '}').length * 1197 +
      invalids.filter((val) => val === '>').length * 25137;

    setPart1Result(total);
  };

  const findPart2Answer = () => {
    console.log(input);

    const justValids = input.filter((row) => {
      const openBrackets = [];
      for (let i = 0; i < row.length; i++) {
        const char = row[i];
        const lastOpenBracket = openBrackets.slice(-1)[0];

        if (char === '(' || char === '{' || char === '<' || char === '[') {
          openBrackets.push(char);
        } else if (
          (char === ')' && lastOpenBracket !== '(') ||
          (char === '}' && lastOpenBracket !== '{') ||
          (char === '>' && lastOpenBracket !== '<') ||
          (char === ']' && lastOpenBracket !== '[')
        ) {
          return false;
        } else {
          openBrackets.pop();
        }
      }
      return true;
    });

    console.log(justValids);

    const completionStrings = [];

    justValids.forEach((row) => {
      const completionString = [];
      const closeBrackets = [];
      for (let i = row.length - 1; i >= 0; i--) {
        const char = row[i];
        const lastCloseBracket = closeBrackets.slice(-1)[0];
        if (char === ')' || char === '}' || char === '>' || char === ']') {
          closeBrackets.push(char);
        } else if (
          (char === '(' && lastCloseBracket !== ')') ||
          (char === '{' && lastCloseBracket !== '}') ||
          (char === '<' && lastCloseBracket !== '>') ||
          (char === '[' && lastCloseBracket !== ']')
        ) {
          completionString.push(bracketMap[char]);
        } else {
          closeBrackets.pop();
        }
      }

      completionStrings.push(completionString);
    });

    const completionScores = completionStrings.map((completionString) =>
      completionString.reduce((acc, char) => acc * 5 + scoreMap[char], 0)
    );

    completionScores.sort((a, b) => a - b);

    setPart2Result(
      completionScores.slice(
        completionScores.length / 2,
        completionScores.length / 2 + 1
      )[0]
    );
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
      Day 10
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

export default Day10;
