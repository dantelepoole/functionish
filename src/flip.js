/**
 * @module flip
 */

'use strict';

const TYPE_STRING = 'string';

const callorcurry = require('../lib/callorcurry');
const curryarity = require('./curryarity');
const loadfunction = require('./loadfunction');

/**
 * Return a function that calls the *func* function with the order of the first two arguments reversed. Any further
 * arguments are passed in their original order.
 * 
 * If the *func* argument is a string, `flip()` will attempt to `require()` the function by passing *func*
 * to {@link module:loadfunction loadfunction()}. See {@link module:loadfunction loadfunction()} for more
 * details.
 * 
 * Currying is preserved. If *func* has been curried (i.e. it has been passed to {@link module:curry curry()}), the
 * flipped function will be curried with the same arity.
 * 
 * @example <caption>Example usage of `flip()`</caption>
 * 
 * const flip = require('functionish/flip');
 * 
 * const isgreaterthan = (x,y) => (x > y);
 * const islessthanorequal = flip(isgreaterthan);
 * 
 * isgreaterthan(1,42);     s// returns false
 * islessthanorequal(1,42); // returns true
 * 
 * @example <caption>Example usage of `flip()` with a curried function</caption>
 * 
 * const { curry, flip } = require('functionish');
 * 
 * const isgreaterthan = curry( (x,y) => (x > y) );
 * const islessthanorequal = flip(isgreaterthan);
 * 
 * const morethanzero = isgreaterthan(0);
 * const atmostzero = islessthanorequal(0);
 * 
 * morethanzero(1); // returns true
 * atmostzero(1);   // returns false
 * 
 * @function flip
 * @see {@link module:loadfunction loadfunction()}
 * @param {(function|string)} func The function to flip the arguments for
 * @returns {function}
 */
function flip(func) {

    return (typeof func === TYPE_STRING) ? flipfunction( loadfunction(func) )
         : iscurried(func) ? callorcurry( curryarity(func), flipfunction(func) )
         : flipfunction(func);
}

function flipfunction(func) {

    const _flip = (a, b, ...args) => func(b, a, ...args);

    return _flip;
}

module.exports = flip;