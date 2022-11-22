/**
 * @module maximum
 */

'use strict';

const ERR_BAD_NUMBERSLIST = `MaximumError~The numbers argument has type %s. Expected an iterable of numbers.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

/**
 * Return the highest value in the argument *numbers* list or `Infinity` if the *numbers* list is empty.
 * 
 * @func maximum
 * @param {iterable} numbers An iterable object producing the numbers to check.
 * @returns {number}
 */
module.exports = function maximum(numbers) {

    notiterable(numbers) && fail(ERR_BAD_NUMBERSLIST, typeorclass(numbers));

    return Math.max(...numbers);
}