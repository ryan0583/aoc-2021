import React, { useEffect, useState } from 'react';
import raw from '../files/day5.txt';
import { readFile } from '../utils';

const Day5 = () => {
  const [input, setInput] = useState();
  const [part, setPart] = useState();
  const [part1Result, setPart1Result] = useState();
  const [part2Result, setPart2Result] = useState();

  const common = () =>
    input.map((row) => {
      const startEnd = row.split(' -> ');
      const coords = [...startEnd[0].split(','), ...startEnd[1].split(',')];

      if (
        parseInt(coords[0]) === parseInt(coords[2]) ||
        parseInt(coords[1]) === parseInt(coords[3])
      ) {
        return {
          start: {
            x: Math.min(parseInt(coords[0]), parseInt(coords[2])),
            y: Math.min(parseInt(coords[1]), parseInt(coords[3])),
          },
          end: {
            x: Math.max(parseInt(coords[0]), parseInt(coords[2])),
            y: Math.max(parseInt(coords[1]), parseInt(coords[3])),
          },
        };
      }
      return {
        start: {
          x: parseInt(coords[0]),
          y: parseInt(coords[1]),
        },
        end: {
          x: parseInt(coords[2]),
          y: parseInt(coords[3]),
        },
      };
    });

  const isOnHorizontalOrVert = (point, x, y) =>
    (y === point.start.y &&
      y === point.end.y &&
      point.start.x <= x &&
      point.end.x >= x) ||
    (x === point.start.x &&
      x === point.end.x &&
      point.start.y <= y &&
      point.end.y >= y);

  const isOnDiagonal = (point, x, y) => {
    let pointX = point.start.x;
    let pointY = point.start.y;

    if (point.start.y > point.end.y) {
      if (point.start.x > point.end.x) {
        while (pointY >= point.end.y && pointX >= point.end.x) {
          if (pointY === y && pointX === x) {
            return true;
          }

          pointX = pointX - 1;
          pointY = pointY - 1;
        }
      } else {
        while (pointY >= point.end.y && pointX <= point.end.x) {
          if (pointY === y && pointX === x) {
            return true;
          }

          pointX = pointX + 1;
          pointY = pointY - 1;
        }
      }
    } else {
      if (point.start.x > point.end.x) {
        while (pointY <= point.end.y && pointX >= point.end.x) {
          if (pointY === y && pointX === x) {
            return true;
          }

          pointX = pointX - 1;
          pointY = pointY + 1;
        }
      } else {
        while (pointY <= point.end.y && pointX <= point.end.x) {
          if (pointY === y && pointX === x) {
            return true;
          }

          pointX = pointX + 1;
          pointY = pointY + 1;
        }
      }
    }

    return false;
  };

  const findPart1Answer = () => {
    const points = common();

    const straightLines = points.filter(
      (point) => point.start.x === point.end.x || point.start.y === point.end.y
    );

    const minX = Math.min(...straightLines.map(({ start: { x } }) => x));
    const minY = Math.min(...straightLines.map(({ start: { y } }) => y));
    const maxX = Math.max(...straightLines.map(({ end: { x } }) => x));
    const maxY = Math.max(...straightLines.map(({ end: { y } }) => y));

    let x = minX;
    let y = minY;

    let result = 0;

    while (y <= maxY) {
      while (x <= maxX) {
        const intersectingLines = straightLines.filter((point) =>
          isOnHorizontalOrVert(point, x, y)
        );
        if (intersectingLines.length >= 2) {
          result = result + 1;
        }
        x = x + 1;
      }
      y = y + 1;
      x = minX;
    }

    setPart1Result(result);
  };

  const findPart2Answer = () => {
    const points = common();

    const minX = Math.min(...points.map(({ start: { x } }) => x));
    const minY = Math.min(...points.map(({ start: { y } }) => y));
    const maxX = Math.max(...points.map(({ end: { x } }) => x));
    const maxY = Math.max(...points.map(({ end: { y } }) => y));

    let x = minX;
    let y = minY;

    let result = 0;

    while (y <= maxY) {
      while (x <= maxX) {
        const intersectingLines = points.filter((point) => {
          if (point.start.x === point.end.x || point.start.y === point.end.y) {
            return isOnHorizontalOrVert(point, x, y);
          } else {
            return isOnDiagonal(point, x, y);
          }
        });
        if (intersectingLines.length >= 2) {
          result = result + 1;
        }
        x = x + 1;
      }
      console.log(`done line ${y}`);
      y = y + 1;
      x = minX;
    }

    setPart2Result(result);
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
      Day 5
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

export default Day5;
