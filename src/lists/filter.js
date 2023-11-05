/**
 * @module lists/filter
 */

'use strict';

const ERR_BAD_LIST = `functionish/lists/filter(): The source argument has type %s. Expected an iterable object.`;

const and = require('../logic/and');
const curry = require('../curry');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const list = require('./list');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');

const raisebadlisterror = compose(raise, error.Type(ERR_BAD_LIST), typeorclassname);

/**
 * to do
 * 
 * @example <caption>Example usage of `filter()`</caption>
 * 
 * const { filter } = require('functionish/lists')
 * 
 * const iseven = x => (x%2) === 0;
 * 
 * const evennumbers = filter(iseven, [1,2,3,4,5]);
 * 
 * Array.from(evennumbers); // returns [2,4]
 * 
 * @function filter
 * @see {@link module:lists/array array()}
 * @param {function} predicate The predicate function
 * @param {iterable} sourcelist An iterable object
 * @returns {iterable} 
 */
function filter(predicate, sourcelist) {

    isfunction(predicate) || (predicate = and(...predicate));

    return isfunction(sourcelist.filter) ? sourcelist.filter(predicate)
         : isiterable(sourcelist) ? filterlist(predicate, sourcelist)
         : raisebadlisterror(sourcelist);
}

function filterlist(predicate, sourcelist) {

    return list(
        function* filteredlist() {
            for(const item of sourcelist) predicate(item) && (yield item);
        }
    )
}

module.exports = curry(1, filter);