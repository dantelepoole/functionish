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
const isinteger = require('./types/isinteger');
const ispositiveorzero = require('./math/ispositiveorzero');
const or = require('./logic/or');
const raise = require('./errors/raise');
const type = require('./types/type');

const badarityerror = compose(raise, error.Type(ERRORMSG_BAD_ARITY));
const isvalidarity = and(isinteger, ispositiveorzero);
const validatearity = or(isvalidarity, badarityerror);

const badfunctionerror = compose(raise, error.Type(ERRORMSG_BAD_FUNCTION), type);
const validatefunction = or(isfunction, badfunctionerror);

const _curry = (targetfunc, arity, ...args) => (arity < args.length) ? targetfunc(...args)
                                             : (arity === args.length) ? targetfunc.bind(null, ...args)
                                             : applycurry(targetfunc, arity, args);

/**
 * Return a function that curries the first *arity* number of arguments and invokes *targetfunc* only after
 * *arity* + 1 arguments have been received.
 * 
 * The *arity* should be set to the minimum number of arguments to curry, i.e. one less than the number of
 * arguments required to run *targetfunc*. If arity is `0`, *targetfunc* itself is returned. If 
 * 
 * @example <caption>Example usage of `curry()`</caption>
 * 
 * to do
 * 
 * @function curry
 * @param {number} arity The number of arguments to curry
 * @param {function} targetfunc The function to curry
 * @returns {function}
 */
function curry(arity, targetfunc) {

    validatearity(arity);
    validatefunction(targetfunc);

    return (arity === 0)
         ? targetfunc
         : applycurry(targetfunc, arity);
}

function applycurry(targetfunc, arity, curriedargs=[]) {
    return _curry.bind(null, targetfunc, arity, ...curriedargs);
}

module.exports = curry;