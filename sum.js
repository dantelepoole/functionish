/**
 * @module sum
 */

'use strict';

const ERR_BAD_NUMBERSLIST = `SumError~The numbers argument has type %s. Expected an iterable of numbers.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

module.exports = function sum(numbers) {

    notiterable(numbers) && fail(ERR_BAD_NUMBERSLIST, typeorclass(numbers));

    let total = 0;

    for(const number of numbers) total += number;
    
    return total;
}