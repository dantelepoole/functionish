/**
 * @module compose
 */

'use strict';

const always = require('./always');
const head = array => array[0];
const id = require('./id');

const composereducer = (args, composer) => [ composer(...args) ];
const largecomposer = composers => (...args) => composers.reduceRight(composereducer, args)[0];

const composermap = Object.freeze([
    always(id),
    head,
    ([f1,f2]) => (...args) => f1(f2(...args)),
    ([f1,f2,f3]) => (...args) => f1(f2(f3(...args))),
    ([f1,f2,f3,f4]) => (...args) => f1(f2(f3(f4(...args)))),
    ([f1,f2,f3,f4,f5]) => (...args) => f1(f2(f3(f4(f5(...args))))),
]);

const initcompose = composers => (composers.length < composermap.length)
                                 ? composermap[composers.length](composers)
                                 : largecomposer(composers);
/**
 * Return a function that runs each function in the *targetfuncs* array in reverse order (i.e. from last
 * to first) passing the previous function's return value to the following function each time.
 * 
 * If the *targetfuncs* array is empty an error is thrown.
 * 
 * @example <caption>Example usage of `compose()`</caption>
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
 * @function compose
 * @see {@link module:pipe pipe()}
 * @param  {...function} targetfuncs One or more functions to compose
 * @returns {function}
 */
function compose(...targetfuncs) {
    return initcompose(targetfuncs);
}

module.exports = compose;