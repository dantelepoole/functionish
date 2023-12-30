/**
 * @module lists/any
 */

'use strict';

const ERR_BAD_LIST = `functionish/lists/any(): The source list has type %s. Expected an iterable object.`;

const exception = require('../errors/exception');
const isiterable = require('../types/isiterable');
const issingleton = require('../arrays/issingleton');
const isstring = require('../types/isstring');
const isvoid = require('../types/isvoid');
const not = require('../logic/not');
const resolve = require('../misc/resolve');
const typeorclassname = require('../types/typeorclassname');

const notiterable = not(isiterable);
const raisebadlisterror = exception('TypeError', ERR_BAD_LIST, typeorclassname);

/**
 * Apply the *predicate* function to each item in *sourcelist* and return `true` when *predicate* returns a truthy value for
 * a *sourcelist* item. If *predicate* returns a falsy value for each item, return `false`.
 * 
 * If the *predicate* is <abbr title="null or undefined">void</abbr>, `any()` evaluates the boolish values of the
 * individual *sourcelist* items instead. If the *predicate* is a string, it is assumed to be the path to a function in a package or file module 
 * to be resolved using {@link module:misc/resolve resolve()}. If *predicate* is neither <abbr title="null or undefined">void</abbr> nor a
 * function or a string, an error is thrown.
 * 
 * If the *sourcelist* is empty, `any()` returns `false`.
 * 
 * The function is short-circuited, so it returns `true` as soon as the *predicate* returns a truthy value, without
 * evaluating any remaining items in *sourcelist*.
 * 
 * `any()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `any()`</caption>
 * 
 * const { any } = require('functionish/lists')
 * 
 * const iseven = x => (x%2) === 0;
 *     
 * any(iseven, [1,3,7,42,9]); // returns true
 * 
 * any(null, [0,'',false]); // returns false because no list items are truthy
 * any(null, [1, '', false]); // returns true because the first list item is truthy;
 * 
 * @function any
 * @see {@link module:lists/all all()}
 * @see {@link module:lists/none none()}
 * @see {@link module:misc/resolve resolve()
 * @param {(function|string)} [predicate=undefined] The predicate function
 * @param {iterable} list An iterable object producing items to test
 * @returns {boolean}
 */
function any(predicate, sourcelist) {

    isstring(predicate) && (predicate = resolve(predicate));
    
    if( issingleton(arguments) ) {
        return any.bind(null, predicate);
    } else if( notiterable(sourcelist) ) {
        raisebadlisterror(sourcelist); 
    } else if( isvoid(predicate) ) {
        for(const value of sourcelist) if( value ) return true;
    } else {
        for(const value of sourcelist) if( predicate(value) ) return true;
    }

    return false;

}

module.exports = any;