/**
 * @module curry
 */

'use strict';

const DEFAULT_CURRY_ARITY = 1;

const getarity = func => (func.length > 1) ? (func.length - 1) : DEFAULT_CURRY_ARITY;

/**
 * to do
 * 
 * @function curry
 * @param {number} arity The number of arguments to curry
 * @param {function} func The function to curry
 * @returns {any}
 */
function curry(arity, func) {

    return (arguments.length === 1) ? initcurry( getarity(arity), arity )
         : (arity > 0) ? initcurry(arity, func)
         : initcurry( getarity(func), func );

}

function initcurry(arity, targetfunc, ...curriedargs) {

    return function _curriedfunction(...args) {

        const argcount = curriedargs.length + args.length;
        
        return (arity < argcount) ? targetfunc.call(this, ...curriedargs, ...args)
             : (arity === argcount) ? partial(targetfunc, ...curriedargs, ...args)
             : initcurry(arity, targetfunc, ...curriedargs, ...args);
    }
}

function partial(func, ...curriedargs) {

    return function _partialfunction(...args) {
        return func.call(this, ...curriedargs, ...args);
    }
}

module.exports = curry;