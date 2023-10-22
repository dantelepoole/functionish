/**
 * @module partial
 */

'use strict';

const SYMBOL_CURRYARITY = Symbol.for('functionish/curry/#CurryArity');
const THIS_NULL = null;

/**
 * [to do: this value]
 * 
 * @example <caption>Example usage of `partial()`</caption>
 * 
 * const partial = require('functionish/partial')
 * 
 * function sum(a,b) {
 *     return (a+b)
 * }
 * 
 * const increment = partial(sum, 1);
 * increment(42); // returns 43
 * 
 * @function partial
 * @param {function} targetfunc The function to partially apply
 * @param  {...any} partialargs Zero or more arguments to partially apply *targetfunc* with
 * @returns {function}
 */
function partial(targetfunc, ...partialargs) {

    const willcurry = (func[SYMBOL_CURRYARITY] >= partialargs.length);

    return willcurry
         ? targetfunc(...partialargs)
         : targetfunc.bind(THIS_NULL, ...partialargs);

}

module.exports = partial;
