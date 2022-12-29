/**
 * @module lists/includes
 */

'use strict';

/**
 * Return `true` if any item in the *list* is strictly equal to *value*. Otherwise, return `false`.
 * 
 * @func includes
 * @param {any} value The value to look for
 * @param {iterable} list An iterable object
 * @returns {boolean}
 */
module.exports = function includes(value, list) {

    for(const item of list) if(item === value) return true;

    return false;
}