/**
 * @module find
 */

'use strict';

const ERR_BAD_LIST = `FindError~The list has type %s. Expected an iterable object`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const resolvefunction = require('./resolvefunction');
const typeorclass = require('./typeorclass');

/**
 * Return the first value in *list* for which the *predicate* function returns a truthy value, or
 * `undefined` if no such value is found.
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
 * @param {iterable} list An iterable object
 * @returns {any}
 */
module.exports = require('./curry2')(

    function find(predicate, list) {

        predicate = resolvefunction(predicate);
        
        notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

        for(const value of list) if( predicate(value) ) return value;
    }
)