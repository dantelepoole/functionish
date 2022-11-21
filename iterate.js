/**
 * @module iterate
 */

'use strict';

const ERR_BAD_LIST = `IterateError~The list has type %s. Expected an object with a forEach() method or an iterable object.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const resolvefunction = require('./resolvefunction');
const typeorclass = require('./typeorclass');

/**
 * Pass each item in *list* to the *func* function.
 * 
 * `list()` is curried by default with binary arity.
 * 
 * @example
 *     
 * const iterate = require('functionish/iterate');
 * 
 * iterate(console.log, [1,2,3]); // prints `2`, `4` and `6`
 *     
 * @func iterate
 * @param {function} func The function to apply to each item in *list*
 * @param {iterable} list An iterable object
 */
module.exports = require('./curry2')(

    function iterate(func, list) {

        func = resolvefunction(func);

        notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

        for(const value of list) func(value);
    }
)