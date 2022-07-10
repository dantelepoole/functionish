/**
 * @module predicate
 */

'use strict';

const ERR_BAD_FILTER = `PredicateError~The filter has type %x. Expected a function.`;

const fail = require('./fail');
const typeorclass = require('./typeorclass');

/**
 * Return a function that is recognized by {@link module:transduce transduce()} and {@link module:transform transform()}
 * and that returns the *filter* transformation when called.
 * 
 * {@link module:transduce transduce()} and {@link module:transform transform()} know to apply a filter transformation
 * differently than a regular transformation. `predicate()` allows them to distinguish one from the other.
 * 
 * The *filter* must be a function that accepts a single argument and returns a boolish value to indicate whether that
 * value should be accepted or ignored.
 * 
 * See the example code for {@link module:transduce transduce()} and/or {@link module:transform transform()} for 
 * examples of how to use `predicate()`.
 * 
 * See also {@link module:pass pass()} and {@link module:drop drop()}, two helper functions that work like `predicate()`
 * but they can combine multiple input *filter*s to a single positive or negative predicate respectively.
 * 
 * @function predicate
 * @see {@link module:transduce transduce()}
 * @see {@link module:transform transform()}
 * @see {@link module:pass pass()}
 * @see {@link module:drop drop()}
 * @param {function} filter A function that accepts a single argument and returns a boolish value
 * @returns {function}
 */
module.exports = function predicate(filter) {

    if(typeof filter !== 'function') fail(ERR_BAD_FILTER, typeorclass(filter));

    return function _filtertransformation_() {
        return filter;
    }

}