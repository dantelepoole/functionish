/**
 * @module curry
 */

'use strict';

const ERRORMSG_BAD_ARITY = `functionish/curry(): The arity %s. Expected a positive integer.`;
const ERRORMSG_BAD_FUNCTION = `functionish/curry(): The function has type %s. Expected a function.`;

const compose = require('./compose');
const error = require('./errors/error');
const isfunction = require('./types/isfunction');
const isinteger = require('./types/isinteger');
const isnumberornan = require('./types/isnumberornan');
const ispositive = require('./math/ispositive');
const raise = require('./errors/raise');
const type = require('./types/type');

const getarityvalueortype = x => isnumberornan(x) ? `is ${x}` : `has type ${typeof x}`;

const badarityerror = compose(raise, error.Type(ERRORMSG_BAD_ARITY), getarityvalueortype);
const badfunctionerror = compose(raise, error.Type(ERRORMSG_BAD_FUNCTION), type);

/**
 * Return a function that curries the first *arity* number of arguments on successive calls and invokes *targetfunc*
 * only after at least *arity* arguments have been received.
 * 
 * The *arity* should be set to the minimum number of arguments to curry, i.e. one less than the number of
 * arguments required to run *targetfunc*. If *arity* is `0`, *targetfunc* itself is returned. If *arity* is negative
 * or not an integer, or if *targetfunc* is not a function, an error is thrown.
 * 
 * Once *arity* number of arguments have been curried, the currying function will always invoke *targetfunc*, even if
 * no additional arguments are passed.
 * 
 * @example <caption>Example usage of `curry()`</caption>
 * 
 * const { curry } = require('functionish');
 * 
 * const add = curry( 1, (x,y) => (x+y) );
 * 
 * const increment = add(1);
 * const decrement = add(-1);
 * 
 * increment(42); // returns 43
 * decrement(42); // returns 41
 * 
 * increment(); // returns NaN even though no second argument was passed, because the arity was already reached
 * 
 * add(1,2); // returns 3 (no currying because the arity was exceeded on the first call)
 * 
 * @function curry
 * @param {number} arity The number of arguments to curry
 * @param {function} targetfunc The function to curry
 * @returns {function}
 * @throws {TypeError} if *arity* is negative or not an integer, or if *targetfunc* is not a function
 */
function curry(arity, targetfunc) {

    isinteger(arity) && ispositive(arity) || badarityerror(arity);
    isfunction(targetfunc) || badfunctionerror(targetfunc);

    const curried = (...args) => (args.length > arity) ? targetfunc(...args)
                               : (args.length === arity) ? targetfunc.bind(null, ...args)
                               : curried.bind(null, ...args);

    return curried;
}

module.exports = curry;