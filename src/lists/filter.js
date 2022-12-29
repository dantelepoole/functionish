/**
 * @module lists/filter
 */

'use strict';

const isfunction = require('../isfunction');
const resolvefunction = require('../resolvefunction');

/**
 * Return an iterable object that produces only the values in *list* for which the
 * *predicate* returns a truthy value.
 * 
 * @example
 * const filter = require('functionish/lists/filter')
 * 
 * const iseven = x => (x%2) === 0;
 * 
 * Array.from( filter(iseven, [1,2,3,4,5]) ); // returns [2,4]
 * 
 * @func filter
 * @param {function} predicate The predicate function
 * @param {iterable} list An iterable object
 * @returns {iterable} 
 */

module.exports = function filter(predicate, list) {

    isfunction(predicate) || (predicate = resolvefunction(predicate));

    return {
        [Symbol.iterator] : function* () {
            for(const value of list) predicate(value) && (yield value);
        }
    }
}