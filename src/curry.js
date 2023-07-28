/**
 * @module curry
 */

'use strict';

const ERROR_BAD_ARITY = `The arity is %s. Expected a positive integer.`;

const format = require('./misc/format');
const partial = require('./partial');
const raise = require('./raise');

const isinteger = Number.isSafeInteger;
const ispositiveinteger = x => isinteger(x) && (x > 0);

const badaritymessage = partial(format, ERROR_BAD_ARITY);
const badarityerror = arity => raise( new TypeError( badaritymessage(arity) ) );
const validatearity = arity => ispositiveinteger(arity) || badarityerror(arity);

/**
 * to do
 * 
 * @example <caption>Example usage of `curry()`</caption>
 * 
 * to co
 * 
 * @function curry
 * @param {number} arity The number of arguments to curry (one less than the minimum number of parameters required by *func*)
 * @param {function} func The function to curry
 * @returns {function}
 */
function curry(arity, func) {
    
    validatearity(arity);

    return initcurry(arity, func, []);
}

function initcurry(arity, target, curriedargs) {

    return function _curriedfunction(...args) {

        const argcount = curriedargs.length + args.length;
        
        return (arity < argcount) ? target.call(this, ...curriedargs, ...args)
             : (arity === argcount) ? partial(target, ...curriedargs, ...args)
             : initcurry(arity, target, [...curriedargs, ...args]);
    }
}

module.exports = curry;