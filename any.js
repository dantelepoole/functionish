/**
 * @module any
 */

'use strict';

const resolvefunction = require('./resolvefunction');

/**
 * Apply the *predicate* function to each item in *list* and return `true` when *predicate* returns a truthy value. If
 * *predicate* returns a falsy value for each item, return `false`.
 * 
 * The function is short-circuited, so it returns `true` as soon as the *predicate* returns a truthy value, without
 * evaluating any remaining items in *list*.
 * 
 * `any()` is curried by default with binary arity.
 * 
 * @example
 * 
 * const any = require('functionish/any')
 * 
 * const iseven = x => (x%2) === 0;
 *     
 * any(iseven, [1,3,7,42,9]); // returns `true`
 * 
 * @func any
 * @see {@link module:all all()}
 * @see {@link module:none none()}
 * @param {function} predicate The predicate function
 * @param {iterable} list An iterable object producing items to test
 * @returns {boolean}
 */

module.exports = require('./curry2')(

    function any(predicate, list) {

        predicate = resolvefunction(predicate);
        
        for( const item of list ) if( predicate(item) ) return true;

        return false;
    }
    
)
