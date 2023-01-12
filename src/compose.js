/**
 * @module compose
 */

'use strict';

const composereducer = (args, func) => [ func(...args) ];

/**
 * Compose is similar to {@link module:pipe pipe()} except that it invokes *funcs* in reverse order, i.e.
 * from right to left. See {@link module:pipe pipe()} for further details.
 * 
 * @example
 * 
 * const { compose } = require('functionish');
 * 
 * const increment = x => (x+1);
 * const double = x => (x*2);
 * const negate = x => -x;
 * 
 * const calculate = compose(negate, double, increment);
 * 
 * calculate(42); // returns `-86`
 * 
 * @func compose
 * @see {@link module:pipe pipe()}
 * @param  {...function} funcs One or more functions to compose to a single function
 * @returns {function}
 */

module.exports = function compose(...funcs) {
    return (...args) => funcs.reduceRight(composereducer, args)[0];
}