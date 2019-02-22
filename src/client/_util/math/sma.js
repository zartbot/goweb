
let _ = require('lodash/core');

function sum(numbers) {
  return _.reduce(numbers, (a, b) => a + b, 0);
}

function average(numbers) {
  return sum(numbers) / (numbers.length || 1);
}


function make_window(before, after) {
  return function (_number, index, array) {
    const start = Math.max(0, index - before);
    const end   = Math.min(array.length, index + after + 1);
    return _.slice(array, start, end);
  }
}

export default function moving_average(before, after, numbers) {
  return _.chain(numbers)
          .map(make_window(before, after))
          .map(average)
          .value();
}