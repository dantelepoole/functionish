/**
 * @module xor
 */

'use strict';

const callable = require('./callable');

/**
 * Return a function that passes its arguments to both *clause* and *otherclause* returns `false` if both return the
 * same boolish value (i.e. either both truthy or both falsy). If the clauses return different boolish values, the
 * function returns `true`. In short, `xor()` returns `true` if *clause* and *otherclause* are unequal.
 * 
 * `xor()` is curried by default.
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
 * @param {(function|any)} clause The first clause to evaluate
 * @param {(function|any)} otherclause The second clause to evaluate
 * @returns {boolean}
 */
module.exports = require('./curry2')(

    function xor(clause, otherclause) {

        return function _xor(...args) {

            const result = !! clause(...args);
            const otherresult = !! otherclause(...args);

            return (result !== otherresult);
        }
    }
)