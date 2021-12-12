import React, { useEffect, useState } from 'react';
import raw from '../files/day12.txt';
import { readFile } from '../utils';

const Day12 = () => {
  const [input, setInput] = useState();
  const [part, setPart] = useState();
  const [part1Result, setPart1Result] = useState();
  const [part2Result, setPart2Result] = useState();

  const appendPathsPart1 = (point, pathSoFar, pathParts, paths) => {
    if (point === point.toLowerCase() && pathSoFar.includes(point)) {
      return;
    }

    if (point === 'end') {
      paths.push(pathSoFar);
      return;
    }

    let newPath = [...pathSoFar, point];

    const nextPoints = pathParts[point];

    nextPoints.forEach((nextPoint) => {
      appendPathsPart1(nextPoint, newPath, pathParts, paths);
    });
  };

  const appendPathsPart2 = (point, pathSoFar, pathParts, paths) => {
    if (point === 'end') {
      paths.push(pathSoFar);
      return;
    }

    if (point === 'start' && pathSoFar.includes(point)) {
      return;
    }

    if (point === point.toLowerCase() && pathSoFar.includes(point)) {
      const existingSmallCaves = pathSoFar.filter((c) => c === c.toLowerCase());

      if ([...new Set(existingSmallCaves)].length < existingSmallCaves.length) {
        return;
      }
    }

    let newPath = [...pathSoFar, point];

    const nextPoints = pathParts[point];

    nextPoints.forEach((nextPoint) => {
      appendPathsPart2(nextPoint, newPath, pathParts, paths);
    });
  };

  const common = () => {
    console.log(input);

    const pathParts = {};

    input.forEach((row) => {
      const dashIndex = row.indexOf('-');

      const a = row.slice(0, dashIndex);
      const b = row.slice(dashIndex + 1);

      if (pathParts[a]) {
        pathParts[a].push(b);
      } else {
        pathParts[a] = [b];
      }

      if (pathParts[b]) {
        pathParts[b].push(a);
      } else {
        pathParts[b] = [a];
      }
    });

    return pathParts;
  };

  const findPart1Answer = () => {
    const pathParts = common();
    const paths = [];
    appendPathsPart1('start', [], pathParts, paths);

    setPart1Result(paths.length);
  };

  const findPart2Answer = () => {
    const pathParts = common();
    const paths = [];
    appendPathsPart2('start', [], pathParts, paths);

    setPart2Result(paths.length);
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
