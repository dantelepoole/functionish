/**
 * @module median
 */

'use strict';

const ERR_BAD_NUMBERSLIST = `MedianError~The numbers argument has type %s. Expected an iterable of numbers.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

const isodd = x => (x%2) === 1;
const numericsort = (a,b) => (a-b);

module.exports = function median(numbers) {

    notiterable(numbers) && fail(ERR_BAD_NUMBERSLIST, typeorclass(numbers));

    numbers = Array.from(numbers).sort(numericsort);
    
    const numbercount = numbers.length;
    const halfnumbercount = (numbers/2);

    return (numbercount === 0) ? 0
         : isodd(numbercount) ? numbers[ Math.floor(halfnumbercount) ]
         : (numbers[halfnumbercount] + numbers[halfnumbercount-1]) / 2;
}