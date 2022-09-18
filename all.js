/**
 * @module all
 */

'use strict';

const compose = require('./compose');
const not = require('./not');
const resolvefunction = require('./resolvefunction');

const complement = compose(not, resolvefunction);

/**
 * Functional variant of {@link external:Array.prototype.every() Array.prototype.every()}. Apply the *predicate*
 * function to each item in *list* and return `true` if and only if *predicate* returns `true` each time. Otherwise,
 * return `false`.
 * 
 * The function is short-circuited, so it returns `false` as soon as the *predicate* returns a falsy value, without
 * evaluating any remaining items in *list*.
 * 
 * `all()` is curried by default with binary arity.
 *
 * @example
 * 
 * const all = require('functionish/all')
 * 
 * const iseven = x => (x%2) === 0;
 *     
 * all(iseven, [2,4,6]); // returns `true`
 * all(iseven, [1,42,3]);  // returns `false`
 * 
 * @func all
 * @see {@link module:any any()}
 * @see {@link module:none none()}
 * @param {function} predicate The predicate function
 * @param {iterable} list An iterable object producing the items to test
 * @returns {boolean}
 */
module.exports = require('./curry2')(

    function all(predicate, list) {

        const notpredicate = complement(predicate);
        
        for(const item of list) if ( notpredicate(item) ) return false;

        return true;
    }
)