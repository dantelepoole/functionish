/**
 * @module lists/dispense
 */

'use strict';

/**
 * Return a function that repeatedly returns successive items from *list*.
 * 
 * Once all items have been dispensed, the function returns the argument passed to the returned function
 * (default: `undefined`);
 * 
 * @example
 * const dispense = require('functionish/lists/dispense');
 * 
 * const getnext = dispense( [1,2,3] );
 * 
 * getnext(); // returns 1
 * getnext(); // returns 2
 * getnext(); // returns 3
 * 
 * getnext(); // returns undefined
 * getnext('nomoreitems'); // returns 'nomoreitems'
 * 
 * @function dispense
 * @param {iterable} list The list of items to dispense
 * @returns {function}
 */
module.exports = function dispense(list) {

    const iterator = list[Symbol.iterator]();

    return function (donemarker=undefined) {

        const { done, value } = iterator.next();

        return done ? donemarker : value;
    }
}