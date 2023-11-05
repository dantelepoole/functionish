/**
 * @module lists/includes
 */

'use strict';

const curry = require('../curry');
const isfunction = require('../types/isfunction');

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

    if( isfunction(list.includes) ) return list.includes(targetvalue);
    
    for(const value of list) if(value === targetvalue) return true;

    return false;
}

module.exports = curry(1, includes);