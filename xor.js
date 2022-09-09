/**
 * @module xor
 */

'use strict';

const PATH_CALLABLE = __dirname + '/callable';

const map = require('./map');

const callable = map(PATH_CALLABLE);

/**
 * Return a function that passes its arguments to both *clause* and *clause2* returns `false` if both return the
 * same boolish value (i.e. either both truthy or both falsy). If the clauses return different boolish values, the
 * function returns `true`. In short, `xor()` returns `true` if *clause* and *clause2* each other's complement.
 * 
 * If either clause is not a function, its value is evaluated directly instead.
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
 * @param {(function|any)} clause The first clause to evaluate
 * @param {(function|any)} clause2 The second clause to evaluate
 * @returns {boolean}
 */
module.exports = require('./curry2')(

    function xor(clause, clause2) {

        [clause, clause2] = callable( [clause, clause2] );

        return function xor_(...args) {

            return clause(...args) ? ! clause2(...args) : !! clause2(...args);
        }
    }
)