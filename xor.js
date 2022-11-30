/**
 * @module xor
 */

'use strict';

const isfunction = require('./isfunction');
const partial = require('./partial');

const boolify = predicate => isfunction(predicate) ? (...args) => (!! predicate(...args))
                                                   : () => (!! predicate);

const xor = (predicate1, predicate2, ...args) => (predicate1(...args) !== predicate2(...args));

/**
 * Return a function that passes its arguments to both *predicate1* and *predicate2* returns `false` if both return the
 * same boolish value (i.e. either both truthy or both falsy). If the predicates return different boolish values, the
 * function returns `true`. In short, `xor()` returns `true` if *predicate1* and *predicate2* each other's complement.
 * 
 * If either predicate is not a function, its value is evaluated directly instead.
 * 
 * `xor()` is curried by default with binary arity.
 * 
 * @example
 * 
 * // a rather contrived example, but it's the best I could come up with
 * 
 * const xor = require('functionish/xor');
 * 
 * function haspositivecharge(particle) { ... }
 * function hasnegativecharge(particle) { ... }
 * 
 * const ischarged = xor(haspositivecharge, hasnegativecharge);
 * 
 * function analyze(particle) {
 *     return ischarged(particle) ? 'charged' : 'not charged';
 * }
 * 
 * @func xor
 * @see {@link module:and and()}
 * @see {@link module:not not()}
 * @see {@link module:or or()}
 * @param {(function|any)} predicate1 The first predicate to evaluate
 * @param {(function|any)} predicate2 The second predicate to evaluate
 * @returns {boolean}
 */
module.exports = require('./curry2')(
    (predicate1, predicate2) => partial(xor, boolify(predicate1), boolify(predicate2))
)