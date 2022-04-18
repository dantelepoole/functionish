/**
 * @module pcompose
 */

'use strict';

const isarray = require('./isarray');
const isundefined = require('./isundefined');
const papply = require('./papply');

const promisereducer = (promise, thenhandler) => promise.then(thenhandler);

/**
 * Promise-variant of {@link module:compose compose()}. Return a function that passes it arguments to the last 
 * (right-most) function in *funcs*, converts the result into a Promise if it isn't one already and then attaches
 * each subsequent *func* (from right to left) in order as a `then()` handler of the previous Promise.
 * 
 * This function is essentially the same as calling the first function to get a pending Promise and then repeatedly
 * calling `promise.then()` for each subsequent function in the chain, working from right to left.
 * 
 * This initial function (i.e. right-most function) should be run asynchronously and return the initial promise of the
 * chain. You may instead pass a regular, synchronous, in which case `pcompose()` will automatically convert its result
 * into a Promise. Be aware, however, that in that case the synchronous code will run immediately, not in the next
 * phase of the event loop. If you require the synchronous function to be deferred to the next phase of the event loop
 * (e.g. if you rely on certain side effects to not occur immediately), you should ensure that your synchronous function
 * is invoked from the microtask queue (see {@link module:papplyasync papplyasync()}).
 * 
 * See {@link module:ppipe ppipe()} for a function that does the same, except it works from left to right instead of
 * right to left.
 * 
 * `pcompose()` may be called as variadic function (accepting a spread parameter of functions) or a unary function,
 * accepting a single argument consisting of an array of functions.
 * 
 * @example
 * 
 * const pcompose = require('functionish/pcompose');
 * const axios = require('axios');
 * 
 * const gettotalvisits = pcompose(
 *    reduce(sum, 0), // add up the total amount of visits by active accounts
 *    map(getaccountvisits), // fetch the number of visits from each account
 *    filter(isaccountactive), // filter out non-active account objects
 *    parsejsonarray, // convert json input to an array of Javascript objects
 *    axios.get // fetch json from the input url
 * )
 * 
 * const totalvisits = gettotalvisits('/getaccountjson');
 * 
 * @func pcompose
 * @see {@link module:ppipe ppipe()}
 * @see {@link module:papplyasync papplyasync()}
 * @param  {(...function|function[])} funcs The functions to compose
 * @returns {function} A function that returns a Promise
 */
module.exports = function pcompose(...funcs) {

    if( funcs.length === 1 && isarray(funcs[0]) ) funcs = funcs[0];

    const initialfunc = funcs.pop();

    return function composedpromise(...args) {

        if( isundefined(initialfunc) ) return args[0];

        const promise = papply(initialfunc, ...args);

        return funcs.reduceRight(promisereducer, promise);
    }
}
