/**
 * @module find
 */

'use strict';

const ERR_BAD_FINDABLE = `FindError~The findable has type %s. Expected an object with a find() method or an iterable object`;

const fail = require('./fail');
const isiterable = require('./isiterable');
const resolvefunction = require('./resolvefunction');
const typeorclass = require('./typeorclass');
const unary = require('./unary');

const isfindable = obj => (typeof obj?.find === 'function');

/**
 * Pass the *predicate* function to the `find()` method of *findable* and return the result. If *findable* has
 * no such method but it is iterable, return pass each item produced by *findable* to the *predicate* function and
 * return the first item for which the *predicate* function returns a truthy value. If no such item exists, return
 * `undefined`.
 * 
 * *Important:* the *predicate* function is coerced to unary arity before it is passed to *findables*'s `find()` method
 * (if it exists). This means that *predicate* will only ever receive a single argument (the item being searched),
 * regardless of how many arguments *findable*'s `find()` method actually passes.
 * 
 * `find()` is curried by default with binary arity.
 * 
 * @example
 *     
 * const find = require('functionish/find');
 * 
 * const iseven = x => (x%2) === 0;
 * 
 * find(iseven, [1,2,3,4]); // returns 2
 * find(iseven, [1,3,5]); // returns `undefined`
 * 
 * @func find
 * @param {function} predicate The predicate function that identifies the item being sought
 * @param {(findable|iterable)} findable An object with a `find()` method or an iterable object
 * @returns {any}
 */
module.exports = require('./curry2')(

    function find(predicate, findable) {

        predicate = resolvefunction(predicate);
        
        return isfindable(findable) ? findable.find( unary(predicate) )
             : isiterable(findable) ? finditerable(predicate, findable)
             : fail(ERR_BAD_FINDABLE, typeorclass(findable));
    }
)

function finditerable(predicate, list) {
    for(const item of list) if( predicate(item) ) return item;
}