/**
 * @module iterate
 */

'use strict';

const ERR_BAD_LIST = `IterateError~The list has type %s. Expected an object with a forEach() method or an iterable object.`;

const fail = require('./fail');
const isiterable = require('./isiterable');
const typeorclass = require('./typeorclass');
const unary = require('./unary');

/**
 * Functional variant of {@link external:Array.prototype.forEach Array.prototype.forEach()}. If *list* has a
 * `forEach()` method, invoke it with *func*. Otherwise, assume *list* is an iterable object and invoke *func* with
 * each item that *list* produces. If *list* has no forEach() method and it is not iterable, an error is thrown.
 * 
 * *Important:* the *func* function is coerced to unary arity before it is passed to *list*'s `forEach()` method.
 * This means that *func* will only ever receive a single argument (the item being iterated), regardless of how many
 * arguments *list*'s `forEach()` method actually passes.
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
 * @see {@link external:Array.prototype.forEach Array.prototype.forEach()}
 * @param {function} func The function to apply to each item in *iterable*
 * @param {iterable} list An iterable object producing items to apply *func* to or an object with a `forEach()` method
 */
module.exports = require('./curry2')(

    function iterate(func, list) {

        if(typeof list?.forEach === 'function') list.forEach( unary(func) );

        else if( isiterable(list) ) for(const item of list) func(item);

        else fail(ERR_BAD_LIST, typeorclass(list));
    }
)