/**
 * @module curry
 */

'use strict';

const CurryArity = Symbol.for('functionish/curry/#CurryArity');
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

/**
 * to do
 * 
 * @example <caption>Example usage of `curry()`</caption>
 * 
 * to do
 * 
 * @function curry
 * @param {number} arity The number of arguments to curry (one less than the minimum number of parameters required by *func*)
 * @param {function} func The function to curry
 * @returns {function}
 */
function curry(arity, func) {

    validatearity(arity) && validatefunction(func);

    return (arity === 0) ? func : applycurry(func, arity);
}

function _curried(func, arity, ...args) {

    arity -= args.length;

    return (arity < 0) ? func(...args)
         : (arity === 0) ? func.bind(THIS_NULL, ...args)
         : applycurry(func, arity, args);
}

function applycurry(func, arity, curriedargs=[]) {

    const curried = _curried.bind(THIS_NULL, func, arity, ...curriedargs);

    curried[CurryArity] = arity;

    return curried;
}

curry.CurryArity = CurryArity;

module.exports = curry;