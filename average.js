/**
 * @module average
 */

'use strict';

const ERR_BAD_NUMBERSLIST = `AverageError~The numbers argument has type %s. Expected an iterable of numbers.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

module.exports = function average(numbers) {

    notiterable(numbers) && fail(ERR_BAD_NUMBERSLIST, typeorclass(numbers));

    let total = 0;
    let count = 0;

    for(const number of numbers) (total += number, count += 1);

    return (count > 0) ? (total/count) : 0;
}