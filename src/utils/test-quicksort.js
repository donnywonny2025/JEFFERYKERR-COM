const quicksort = require('./quicksort.js');

const testArray = [3, 6, 8, 10, 1, 2, 1];
const sorted = quicksort(testArray);
console.log(sorted); // Should output [1, 1, 2, 3, 6, 8, 10]