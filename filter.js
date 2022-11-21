/**
 * @module filter
 */

'use strict';

const ERR_BAD_LIST = `FilterError~The iterable has type %s. Expected an iterable object`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const resolvefunction = require('./resolvefunction');
const typeorclass = require('./typeorclass');

/**
 * Return an iterable object that produces only the values in *list* for which the
 * *predicate* returns a truthy value.
 * 
 * `filter()` is curried by default with binary arity.
 * 
 * @example
 * const filter = require('functionish/filter')
 * 
 * const iseven = x => (x%2) === 0;
 * 
 * Array.from( filter(iseven, [1,2,3,4,5]) ); // returns [2,4]
 * 
 * @func filter
 * @param {function} predicate The predicate function
 * @param {iterable} list An iterable object
 * @returns {iterable} 
 */

module.exports = require('./curry2')(

    function filter(predicate, list) {

        predicate = resolvefunction(predicate);

        notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

        return {
            [Symbol.iterator] : function* () {
                for(const value of list) if( predicate(value) ) yield value;
            }
        }
    }
)