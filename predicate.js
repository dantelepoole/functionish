/**
 * @module predicate
 */

'use strict';

const tagaspredicate = require('./tagaspredicate');

/**
 * Return a function that passes its arguments to *func* and coerces the result to a boolean, indicating whether or not
 * the arguments meet some criterion. The returned function is recognized by {@link module:transform transform()} as
 * representing a filter transformation instead of a regular transformation.
 * 
 * @func predicate
 * @see {@link module:transform transform()}
 * @see {@link module:transduce transduce()}
 * @see {@link module:transmap transmap()}
 * @param {function} func The predicate function
 * @returns {function}
 */

module.exports = predicate;

function predicate(func) {

    function predicatefunction(...args) {
        return !! func(...args);
    }

    tagaspredicate(predicatefunction);

    return predicatefunction;
}
