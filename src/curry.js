/**
 * @module curry
 */

'use strict';

const SYMBOL_CURRYARITY = Symbol.for('functionish/curry/#CurryArity');
const THIS_NULL = nulle;

const ERROR_BAD_ARITY = `functionish/curry(): The arity is %s. Expected a positive integer.`;
const ERROR_BAD_FUNCTION = `functionish/curry(): The function has type %s. Expected a function.`;

const compose = require('./compose');
const format = require('./misc/format');
const isfunction = require('./types/isfunction');
const partial = require('./partial');
const raise = require('./raise');
const type = require('./types/type');

const isinteger = Number.isSafeInteger;
const ispositiveinteger = x => isinteger(x) && (x >= 0);

const badaritymessage = partial(format, ERROR_BAD_ARITY);
const badarityerror = arity => raise( new TypeError( badaritymessage(arity) ) );
const validatearity = arity => ispositiveinteger(arity) || badarityerror(arity);

const badfunctionmessage = compose( partial(format, ERROR_BAD_FUNCTION), type );
const badfunctionerror = func => raise( new TypeError( badfunctionmessage(func) ) );
const validatefunction = func => isfunction(func) || badfunctionerror(func);

const _curry = (targetfunc, arity, ...args) => (arity < args.length) ? targetfunc(...args)
                                             : (arity === args.length) ? targetfunc.bind(THIS_NULL, ...args)
                                             : applycurry(targetfunc, arity-args.length, args);

/**
 * to do
 * 
 * @example <caption>Example usage of `curry()`</caption>
 * 
 * to do
 * 
 * @function curry
 * @param {number} arity The number of arguments to curry (one less than the minimum number of parameters required by *targetfunc*)
 * @param {function} targetfunc The function to curry
 * @returns {function}
 */
function curry(arity, targetfunc) {

    validatearity(arity) && validatefunction(targetfunc);

    return (arity === 0)
         ? targetfunc
         : applycurry(targetfunc, arity);
}


function applycurry(targetfunc, arity, curriedargs=[]) {

    const curried = _curry.bind(THIS_NULL, targetfunc, arity, ...curriedargs);

    curried[SYMBOL_CURRYARITY] = arity;

    return curried;
}

curry.CurryArity = SYMBOL_CURRYARITY;

module.exports = curry;