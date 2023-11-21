/**
 * @module curry
 */

'use strict';

const ERRORMSG_BAD_ARITY = `functionish/curry(): The arity is %s. Expected a positive integer.`;
const ERRORMSG_BAD_FUNCTION = `functionish/curry(): The function has type %s. Expected a function.`;

const and = require('./logic/and');
const compose = require('./compose');
const error = require('./errors/error');
const isfunction = require('./types/isfunction');
const ispositiveorzero = require('./math/ispositiveorzero');
const raise = require('./errors/raise');
const type = require('./types/type');

const isvalidarity = and(Number.isSafeInteger, ispositiveorzero);

const badarityerror = compose(raise, error.Type(ERRORMSG_BAD_ARITY));
const validatearity = arity => isvalidarity(arity) || badarityerror(arity);

const badfunctionerror = compose(raise, error.Type(ERRORMSG_BAD_FUNCTION), type);
const validatefunction = func => isfunction(func) || badfunctionerror(func);

const _curry = (targetfunc, arity, ...args) => (arity < args.length) ? targetfunc(...args)
                                             : (arity === args.length) ? targetfunc.bind(THIS_NULL, ...args)
                                             : applycurry(targetfunc, arity, args);

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
    return _curry.bind(null, targetfunc, arity - curriedargs.length, ...curriedargs);
}

module.exports = curry;