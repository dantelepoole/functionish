/**
 * @module lists/stateful
 */

'use strict';

const always = require('../always');
const compose = require('../compose');
const iterator = require('./iterator');
const list = require('./list');

const initstatefullist = compose(list, always, iterator);

/**
 * Return an iterable object that always returns the same iterator object, preserving the iterator's state between
 * subsequent iterations.
 * 
 * @example <caption>Example usage of `stateful()`</caption>
 * 
 * const { stateful } = require('functionish/lists');
 * 
 * const statefullist = stateful([1,2,3,4,5,6]);
 * 
 * for(const item of statefullist) {
 *   console.log(item);
 *   if(item === 3) break;
 * }
 * // prints:
 * //   1
 * //   2
 * //   3
 * 
 * for(const item of statefullist) {
 *   console.log(item);
 * }
 * // prints:
 * //   4
 * //   5
 * //   6
 * 
 * for(const item of statefullist) {
 *   console.log(item);
 * }
 * // prints nothing
 * 
 * @function stateful
 * @param {iterable} sourcelist An iterable object
 * @returns {iterable} 
 */
function stateful(sourcelist) {
    return initstatefullist(sourcelist);
}

module.exports = stateful;