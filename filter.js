/**
 * @module filter
 */

'use strict';

const ERR_BAD_FILTERABLE = `FilterError~The filterable has type %s. Expected an object with a filter() method or an iterable object`;

const unary = require('./unary');

const fail = require('./fail');
const isfunction = require('./isfunction');
const isiterable = require('./isiterable');
const resolvefunction = require('./resolvefunction');
const typeorclass = require('./typeorclass');

const isfilterable = obj => isfunction(obj?.filter);

/**
 * Pass the *predicate* function to the `filter()` method of *filterable* and return the result. If *filterable* has
 * no such method but it is iterable, return an iterable object that produces only those items from *filterable* for
 * which the *predicate* returns a truthy value.
 * 
 * *Important:* the *predicate* function is coerced to unary arity before it is passed to *filterable*'s `filter()`
 * method (if it exists). This means that *predicate* will only ever receive a single argument (the item being
 * filtered), regardless of how many arguments *filterable*'s `filter()` method actually passes.
 * 
 * `filter()` is curried by default with binary arity.
 * 
 * @example
 * 
 * const filter = require('functionish/filter')
 * 
 * const iseven = x => (x%2) === 0;
 * 
 * filter(iseven, [1,2,3,4,5]); // returns [2,4]
 * 
 * @func filter
 * @param {function} predicate The predicate function
 * @param {(filterable|iterable)} filterable An object that has a `filter()`-method or an iterable object
 * @returns {any} 
 */

module.exports = require('./curry2')(

    function filter(predicate, filterable) {

        predicate = resolvefunction(predicate);

        return isfilterable(filterable) ? filterable.filter( unary(predicate) )
             : isiterable(filterable) ? filterlist(predicate, filterable)
             : fail(ERR_BAD_FILTERABLE, typeorclass(filterable));
    }
)

function filterlist(predicate, list) {
    
    return {

        [Symbol.iterator] : function* () {
            for(const item of list) if( predicate(item) ) yield item;
        }
    }
}