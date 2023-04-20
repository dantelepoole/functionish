/**
 * @module lists/includes
 */

'use strict';

const curry = require('../curry');

/**
 * [to do]
 * 
 * @example <caption>Example usage of `includes()`</caption>
 * 
 * to do
 * 
 * @function includes
 * @param {any} targetvalue The value to look for
 * @param {iterable} list An iterable object
 * @returns {boolean}
 */
function includes(targetvalue, list) {

    for(const value of list) if(value === targetvalue) return true;

    return false;
}

function includesusing(comparator, targetvalue, list) {

    for(const value of list) if(comparator(value) === targetvalue) return true;

    return false;    
}

includes.using = curry(2, includesusing);

module.exports = curry(1, includes);