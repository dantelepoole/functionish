/**
 * @module minimum
 */

'use strict';

const ERR_BAD_NUMBERSLIST = `MinimumError~The numbers argument has type %s. Expected an iterable of numbers.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

/**
 * Return the lowest value in the argument *numbers* list or `Infinity` if the *numbers* list is empty.
 * 
 * @func minimum
 * @param {iterable} numbers An iterable object producing the numbers to check.
 * @returns {number}
 */
module.exports = function minimum(numbers) {

    notiterable(numbers) && fail(ERR_BAD_NUMBERSLIST, typeorclass(numbers));

    return Math.min(...numbers);
}