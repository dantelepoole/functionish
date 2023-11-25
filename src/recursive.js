/**
 * @module recursive
 */

'use strict';

const ERR_BAD_TARGETFUNCTION = `functionish/recursive(): The target function has type %'s'. Expected a function.`;
const ERR_BOUND_TARGETFUNCTION = `functionish/recursive(): The target function may not be bound.`;

const FLAG_RECURSE = Symbol('functionish/recursive/#FLAG_RECURSE');

const format = require('./misc/format');
const isfunction = require('./types/isfunction');
const typeorclassname = require('./types/typeorclassname');

const notbound = func => !func.name.startsWith('bound ');

/**
 * Emulate tail recursion for a *targetfunc*. To recurse, instead of calling itself the *targetfunc* should call
 * `this()`, passing the arguments for the next iteration.
 * 
 * Other than recursively calling `this()` rather than itself, the implementation of *targetfuncs* is no different than
 * that of any other tail recursive function. That does mean that to recurse correctly, *targetfunc* must return the
 * value returned by `this()` and only the value returned by `this()`, without manipulating it in any way. While failing
 * to do so would normally result only in the forfeiture of tail call optimization, in the case of `recursive()` it
 * means the recursion will be prematurely aborted with an incorrect return value.
 * 
 * Under the hood, `recursive()` is implemented by repeatedly calling a bound *targetfunc* in a (fairly straightforward)
 * `do...while`-loop, so there is bound to be a certain performance penalty.
 * 
 * Regrettably, the reliance on *targetfunc*'s `this` value means that `recursive()` does not work as advertised with
 * arrow functions or bound functions.
 * 
 * @example <caption>Example usage of `recursive()`</caption>
 * 
 * const { recursive } = require('functionish');
 * 
 * const sum = recursive(
 *     function sum(total, index, numbers) {
 *     
 *         return (index < numbers.length)
 *              : this(total + numbers[index], index+1, numbers)
 *              : total;
 *     },
 *     0, // initial value for the total-parameter
 *     0, // initial value for the index-parameter
 * )
 * 
 * sum( [1,2,3,4,5] ); // returns 15
 * 
 * @function recursive
 * @see {@link https://medium.com/@JavaScript-World/javascript-recursion-and-tail-call-optimization-944be86bb3bb|A primer on recursion and tail call optimization in Javascript}
 * @param {function} targetfunc The function to call recursively
 * @param  {...any} partialargs The arguments to pre-bind to *targetfunc*
 * @returns {function}
 * @throws {TypeError} if *targetfunc* is not a function or if it has already been bound
 */
function recursive(targetfunc, ...partialargs) {

    validatetargetfunction(targetfunc);

    return recurse.bind(null, targetfunc, ...partialargs);
}

function recurse(targetfunc, ...args) {

    const recurse = (...recurseargs) => (args = recurseargs, FLAG_RECURSE);
    const recursivefunc = targetfunc.bind(recurse);

    let result;

    do {
        result = recursivefunc(...args);
    } while(result === FLAG_RECURSE);

    return result;
}

function validatetargetfunction(targetfunc) {

    if( isfunction(targetfunc) && notbound(targetfunc) ) return targetfunc;

    const errormessage = isfunction(targetfunc)
                       ? ERR_BOUND_TARGETFUNCTION
                       : format(ERR_BAD_TARGETFUNCTION, typeorclassname(targetfunc));

    throw new TypeError(errormessage);
}

module.exports = recursive;