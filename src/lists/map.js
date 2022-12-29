/**
 * @module lists/map
 */

'use strict';

const isfunction = require('./isfunction');
const resolvefunction = require('../resolvefunction');

/**
 * Return an iterable object that passes each value to the *mapfunc* function and produces the results.
 * 
 * @example
 * 
 * const map = require('functionish/lists/map');
 * 
 * const double = x => (x*2);
 * 
 * map(double, [1,2,3]); // returns [2,4,6]
 *     
 * @func map
 * @param {function} mapfunc The function to apply to each item in *list*
 * @param {iterable} list An iterable object
 * @returns {any}
 */

module.exports = function map(mapfunc, list) {
    
    isfunction(mapfunc) || (mapfunc = resolvefunction(mapfunc));

    return {
        [Symbol.iterator] : function* () {
            for(const value of list) yield mapfunc(value);
        }
    }
}