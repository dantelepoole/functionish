/**
 * @module lists/autoreduceright
 */

'use strict';

const NO_INITIAL_VALUE = undefined;

const isfunction = require('../types/isfunction');
const issingleton = require('../arrays/issingleton');
const reduceright = require('./reduceright');
const resolve = require('../misc/resolve');

/**
 * Similar to {@link module:lists/reduceright reduceright()} except that no initial value is used. Instead, the last
 * item in the *list* is passed to the *reducer* on the first call along with the *list*'s second-to-last item. 
 * 
 * If the *reducer* is a string, it is assumed to be the path to a function in a package or file module 
 * to be resolved using {@link module:misc/resolve resolve()}.
 * 
 * If the *list* contains a single item, that item is returned as `autoreducerights()`'s return value. If the *list* is
 * empty, `undefined` is returned.
 * 
 * `autoreduceright()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `autoreduceright()`</caption>
 * 
 * const { autoreduceright } = require('functionish/autoreduceright');
 * 
 * const subtract = (a,b) => (a-b);
 * 
 * autoreduceright(subtract, [1,2,4]); // returns 1
 * autoreduceright(subtract, [42]); // returns 42
 * autoreduceright(subtract, []); // returns undefined
 * 
 * @function autoreduceright
 * @see {@link module:lists/reduce reduce()}
 * @param {function} reducer The reducer function
 * @param {iterable} list The iterable object producing the items to reduce
 * @returns {any}
 */
function autoreduceright(reducer, list) {

    let started = false;

    isfunction(reducer) || (reducer = resolve(reducer));

    const autoreducer = (accumulator, nextvalue) => started
                                                  ? reducer(accumulator, nextvalue)
                                                  : (started = true, nextvalue);
    
    return issingleton(arguments)    
         ? reduceright.bind(null, autoreducer, NO_INITIAL_VALUE)
         : reduceright(autoreducer, NO_INITIAL_VALUE, list);
}

module.exports = autoreduceright;
