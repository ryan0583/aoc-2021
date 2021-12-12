import React, { useEffect, useState } from 'react';
import raw from '../files/day12.txt';
import { readFile } from '../utils';

const Day12 = () => {
  const [input, setInput] = useState();
  const [part, setPart] = useState();
  const [part1Result, setPart1Result] = useState();
  const [part2Result, setPart2Result] = useState();

  const findPart1Answer = () => {
    console.log(input);

    const pathParts = input.map((row) => {
      const dashIndex = row.indexOf('-');
      return {
        a: row.slice(0, dashIndex),
        b: row.slice(dashIndex + 1),
      };
    });

    console.log(pathParts);

    let nextCaves = ['start'];

    let pathsToCheck = ['start'];

    let paths = [...pathsToCheck];

    let lastPaths = [];

    let concludedPaths = [];

    while (!paths.every((path) => lastPaths.includes(path))) {
      console.log('Processing...');
      lastPaths = [...paths];
      const nextNextCaves = [];
      let nextPaths = [];

      nextCaves.forEach((cave) => {
        if (cave !== 'end') {
          const pathPartsWithCave = pathParts.filter(
            (pathPart) => pathPart.a === cave || pathPart.b === cave
          );

          const nextLetters = pathPartsWithCave.map((pathPart) =>
            pathPart.a === cave ? pathPart.b : pathPart.a
          );

          nextLetters.forEach((nextLetter) => {
            if (nextLetter !== 'start') {
              let added = false;

              nextPaths.push(
                ...pathsToCheck.map((path) => {
                  if (
                    path.includes(cave) &&
                    path.slice(
                      path.lastIndexOf('-') > 0 ? path.lastIndexOf('-') + 1 : 0
                    ) === cave &&
                    (nextLetter !== nextLetter.toLowerCase() ||
                      !path.includes(nextLetter))
                  ) {
                    added = true;
                    return `${path}-${nextLetter}`;
                  }
                  return path;
                })
              );

              if (added) {
                nextNextCaves.push(nextLetter);
              }
            }
          });

          const uniqueNextPaths = [...new Set(nextPaths)];

          concludedPaths = [
            ...new Set([
              ...concludedPaths,
              ...uniqueNextPaths.filter((path) => path.includes('end')),
            ]),
          ];

          pathsToCheck = [
            ...uniqueNextPaths.filter((path) => !path.includes('end')),
          ];

          console.log(pathsToCheck);

          paths = [...concludedPaths, ...pathsToCheck];

          nextPaths = [];
        }
      });

      nextCaves = [...new Set(nextNextCaves)];
    }

    console.log(concludedPaths);
  };

  const findPart2Answer = () => {};

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
      Day 12
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

export default Day12;
