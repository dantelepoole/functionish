/**
 * @module lists/includes
 */

'use strict';

const curry1 = require('../curry1');
const isfunction = require('../types/isfunction');

/**
 * If *sourcelist* has an `includes()` method, it is passed the *targetvalue* and the result is returned. Otherwise,
 * return `true` if any item in the *sourcelist* is strictly equal to the *targetvalue*, or `false` if no such items
 * exists in the *sourcelist*.
 * 
 * `includes()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `includes()`</caption>
 * 
 * const { includes } = require('functionish/lists');
 * 
 * includes(42, [1,2,3,4]); // returns false
 * includes(42, [42]); // returns true
 * 
 * @function includes
 * @param {any} targetvalue The value to look for
 * @param {iterable} list An iterable object
 * @returns {boolean}
 */
const includes = curry1(function includes(targetvalue, sourcelist) {

    if( isfunction(sourcelist.includes) ) return sourcelist.includes(targetvalue);
    
    for(const item of sourcelist) if(item === targetvalue) return true;

    return false;
})

module.exports = includes;