/**
 * @module math/median
 */

'use strict';

const isodd = x => (x%2) === 1;
const numericsort = (a,b) => (a-b);

module.exports = function median(numbers) {

    numbers = Array.from(numbers).sort(numericsort);
    
    const numbercount = numbers.length;
    const halfnumbercount = (numbers/2);

    return (numbercount === 0) ? 0
         : isodd(numbercount) ? numbers[ Math.floor(halfnumbercount) ]
         : (numbers[halfnumbercount] + numbers[halfnumbercount-1]) / 2;
}