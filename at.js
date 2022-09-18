/**
 * @module at
 */

'use strict';

const ERR_BAD_INDEX = `AtError~The index has type %s. Expected a number.`;

const fail = require('./fail');
const islessthan = require('./islessthan');
const notnumber = require('./notnumber');
const typeorclass = require('./typeorclass');

const isnegative = islessthan(0);

/**
 * Retrieve the item from *list* at index *index* or `undefined` if the index is invalid. If *index* is negative,
 * it represents the index counting down from the end of *list* (so -1 represents the last item in *list*).
 * 
 * @example
 * 
 * const at = require('functionish/at');
 * 
 * const array = [1,2,3,42, 5];
 * const item = at(3, array);
 * console.log( item ); // prints `42`
 * 
 * @func at
 * @param {any[]} list The array to retrieve the item from
 * @param {number} index The index of the item to retrieve
 * @returns {any}
 * @throws {Error} Error if *index* is not a number
 */

module.exports = function at(list, index) {

    return notnumber(index) ? fail(ERR_BAD_INDEX, typeorclass(index))
         : isnegative(index) ? list[index + list.length]
         : list[index];

}
