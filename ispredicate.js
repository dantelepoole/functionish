/**
 * @module ispredicate
 */

'use strict';

const PREDICATE_TAG = Symbol.for('functionish/predicate/tag');

/**
 * Return `true` if *func* is a predicate function, meaning that it has earlier been passed to the 
 * {@link module:predicate predicate()} function. This allows {@link module:transform transform()} to distinguish
 * regular transformations from filtering transformations.
 * 
 * @func ispredicate
 * @see {@link module:transform transform()}
 * @see {@link module:predicate predicate()}
 * @param {function} func The function to check
 * @returns {function}
 */

module.exports = function ispredicate(func) {
    return (func?.[PREDICATE_TAG] === PREDICATE_TAG);
}