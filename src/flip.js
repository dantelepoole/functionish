/**
 * @module flip
 */

'use strict';

const THIS_NULL = null;

const haveinitialarg = args => (args.length > 1);

/**
 * to do
 * 
 * @example <caption>Example usage of `flip()`</caption>
 * 
 * [to do]
 * 
 * @function flip
 * @param {function} targetfunc The function to flip the arguments of
 * @returns {function}
 */
function flip(targetfunc, initialarg) {

    const flippedfunc = (a, b, ...args) => targetfunc(b, a, ...args)

    return haveinitialarg(arguments)
         ? flippedfunc.bind(THIS_NULL, initialarg)
         : flippedfunc;

}

module.exports = flip;