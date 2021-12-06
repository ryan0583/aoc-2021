import React, { useState, useEffect } from 'react';
import { readFile } from '../utils';
import raw from '../files/day3.txt';

const Day3 = () => {
  const [input, setInput] = useState();

  const [part2Result, setPart2Result] = useState();

  const filterInputForO2 = (revisedInput, index) => {
    const interestingNums = revisedInput.map((row) =>
      row.slice(index, index + 1)
    );
    const numOnes = interestingNums.filter((num) => num === '1').length;
    const numZeros = interestingNums.filter((num) => num === '0').length;
    if (numOnes >= numZeros) {
      return revisedInput.filter((row) => row.slice(index, index + 1) === '1');
    }
    return revisedInput.filter((row) => row.slice(index, index + 1) === '0');
  };

  const filterInputForCO2 = (revisedInput, index) => {
    const interestingNums = revisedInput.map((row) =>
      row.slice(index, index + 1)
    );
    const numOnes = interestingNums.filter((num) => num === '1').length;
    const numZeros = interestingNums.filter((num) => num === '0').length;
    if (numOnes < numZeros) {
      return revisedInput.filter((row) => row.slice(index, index + 1) === '1');
    }
    return revisedInput.filter((row) => row.slice(index, index + 1) === '0');
  };

  useEffect(() => {
    if (input) {
      let revisedInput = input;
      let index = 0;
      while (revisedInput.length > 1) {
        revisedInput = filterInputForO2(revisedInput, index);
        index = index + 1;
      }
      const O2GenRating = parseInt(revisedInput[0], 2);

      revisedInput = input;
      index = 0;
      while (revisedInput.length > 1) {
        revisedInput = filterInputForCO2(revisedInput, index);
        index = index + 1;
      }

      const CO2ScrubberRating = parseInt(revisedInput[0], 2);

      setPart2Result(O2GenRating * CO2ScrubberRating);
    }
  }, [input]);

  const part2 = () => {
    readFile(raw, setInput);
  };

  return (
    <div>
      <br />
      Day 3
      <div className="flex">
        <button onClick={part2}>part 2</button>
        {part2Result && ` ${part2Result}`}
      </div>
    </div>
  );
};

export default Day3;
