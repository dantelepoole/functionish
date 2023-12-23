/**
 * @module lists/filter
 */

'use strict';

const ERR_BAD_LIST = `functionish/lists/filter(): The source list has type %s. Expected an iterable object.`;
const ERR_BAD_PREDICATE = `functionish/lists/filter(): The predicate has type %s. Expected a function.`;

const compose = require('../compose');
const curry1 = require('../curry1');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const list = require('./list');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');

const raisebadlisterror = compose(raise, error.Type(ERR_BAD_LIST), typeorclassname);
const raisebadpredicaterror = compose(raise, error.Type(ERR_BAD_PREDICATE), typeorclassname);

/**
 * If the *sourcelist* has a method called `filter()`, pass the *predicate* function to this method and return the
 * result. Otherwise, return a lazy iterable object that produces only those items from *sourcelist* for which the
 * *predicate* returns a truthy value.
 * 
 * If the *sourcelist* has a `filter()`-method (e.g. an Array) the *predicate* is passed to this method and result
 * is returned.
 * 
 * `filter()` is curried by default with unary arity.
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
 * @param {function} predicate The predicate function
 * @param {iterable} sourcelist An iterable object
 * @returns {iterable} 
 */
const filter = curry1(function filter(predicate, sourcelist) {

    isfunction(predicate) || raisebadpredicaterror(predicate);

    return isfunction(sourcelist.filter) ? sourcelist.filter(predicate)
         : isiterable(sourcelist) ? filterlist(predicate, sourcelist)
         : raisebadlisterror(sourcelist);

})

function filterlist(predicate, sourcelist) {

    return list(
        function* filteriterator() {
            for(const item of sourcelist) predicate(item) && (yield item);
        }
    )
}

module.exports = filter;