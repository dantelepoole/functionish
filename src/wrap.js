/**
 * @module wrap
 */

'use strict';

const ERR_BAD_COMPOSITEWRAPPER = `functionish/wrap(): One or more of the items in the wrapper-array is not a function.`;
const ERR_BAD_WRAPPER = `functionish/wrap(): The wrapper argument has type '%s'. Expected a function or function-array.`;
const ERR_BAD_TARGETFUNCTION = `functionish/wrap(): The target function has type '%s'. Expected a function.`;
const ERR_EMPTY_WRAPPERARRAY = `functionish/wrap(): The wrapper-array is empty. Expected at least one wrapper function.`;

const curry1 = require('./curry1');
const format = require('./misc/format');
const hasitems = require('./misc/hasitems');
const isarray = require('./types/isarray');
const isfunction = require('./types/isfunction');
const type = require('./types/type');
const typeorclassname = require('./types/typeorclassname');

const iscompositewrapper = wrapper => isarray(wrapper) && wrapper.every(isfunction) && (wrapper.length > 0);
const raisebadcompositewrapper = () => { throw new TypeError(ERR_BAD_COMPOSITEWRAPPER) }
const raisebadtargetfunction = func => { throw new TypeError(format(ERR_BAD_TARGETFUNCTION, typeorclassname(func))) }
const raiseemptywrapperarray = () => { throw new TypeError(ERR_EMPTY_WRAPPERARRAY) }
const wrapreducer = (nextwrapper, wrapper) => isfunction(wrapper) && wrapper.bind(null, nextwrapper)
                                               ||
                                              raisebadcompositewrapper();

/**
 * Wrap a target function with one or more wrapper functions.
 * 
 * A wrapper function accepts the target function and a list of arguments and can manipulate the arguments before
 * passing them to the target function and/or manipulate the target function's return value before passing it back
 * to the caller.
 * 
 * The wrapper argument may be either a function or an array of wrapper functions. In the latter case, the wrapper
 * functions are called in order.
 * 
 * `wrap()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `wrap()`</caption>
 *     
 * const { wrap } = require('functionish');
 * 
 * const sum => (...numbers) => numbers.reduce( (a,b)=>(a+b), 0 );
 * const double = (targetfunc, ...numbers) => 2 * targetfunc(...numbers);
 * const onlyodd = (targetfunc, ...numbers) => targetfunc( ...numbers.filter(x => x%2 === 1) );
 * 
 * const sumanddoubleonlyodd = wrap( [double, onlyodd], sum );
 * 
 * sumanddoubleonlyodd(1,2,3,4,5); // returns 18
 * 
 * @function wrap
 * @param {(function|function[])} wrapper The function or array of functions to wrap *targetfunc* with
 * @param {function} targetfunc The function to wrap
 * @returns {function}
 */
const wrap = curry1(function wrap(wrapper, targetfunc) {

    isfunction(targetfunc) || raisebadtargetfunction(targetfunc);

    return isfunction(wrapper) && wrapper.bind(null, targetfunc)
            ||
           (hasitems(wrapper) && wrapper.reduceRight(wrapreducer, targetfunc))
            ||
           raiseemptywrapperarray();

})

module.exports = wrap;
