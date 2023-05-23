/**
 * @module curry
 */

'use strict';

const ERROR_BAD_ARITY = `The arity is %s. Expected a positive integer.`;

const format = require('./misc/format');
const partial = require('./partial');
const raise = require('./raise');

const badarity = partial(format, ERROR_BAD_ARITY);
const isinteger = Number.isSafeInteger;
const raisebadarity = arity => raise( new TypeError( badarity(arity) ) );
const validatearity = arity => (isinteger(arity) && arity > 0) || raisebadarity(arity);

/**
 * to do
 * 
 * @function curry
 * @param {number} arity The number of arguments to curry
 * @param {function} func The function to curry
 * @returns {any}
 */
function curry(arity, func) {
    return validatearity(arity) && initcurry(arity, func);
}

function initcurry(arity, targetfunc, ...curriedargs) {

    _curriedfunction.curryarity = (arity - curriedargs.length);

    return _curriedfunction;

    function _curriedfunction(...args) {

        const argcount = curriedargs.length + args.length;
        
        return (arity < argcount) ? targetfunc.call(this, ...curriedargs, ...args)
             : (arity === argcount) ? partial(targetfunc, ...curriedargs, ...args)
             : initcurry(arity, targetfunc, ...curriedargs, ...args);
    }
}

module.exports = curry;