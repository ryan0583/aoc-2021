import React from 'react';

const Grid = ({ points }) => {
  const maxX = Math.max(...points.map(({ x }) => x));
  const maxY = Math.max(...points.map(({ y }) => y));

  console.log(maxY);

  const pointsStr = points.map((point) => `${point.x},${point.y}`);

  console.log(points.map(({ x }) => parseInt(x)));

  const components = [];

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      components.push(
        <rect
          width={1}
          height={1}
          x={x}
          y={y}
          fill={pointsStr.includes(`${x},${y}`) ? 'red' : 'black'}
        />
      );
    }
  }

  console.log(components);

  return <svg viewBox={`0 0 ${maxX + 1} ${maxY + 1}`}>{components}</svg>;
};

export default Grid;
