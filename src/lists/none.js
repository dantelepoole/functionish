/**
 * @module lists/none
 */

'use strict';

const ERR_BAD_LIST = `functionish/lists/none(): The source list has type %s. Expected an iterable object.`;

const exception = require('../errors/exception');
const isiterable = require('../types/isiterable');
const issingleton = require('../arrays/issingleton');
const isstring = require('../types/isstring');
const isvoid = require('../types/isvoid');
const not = require('../logic/not');
const typeorclassname = require('../types/typeorclassname');

const notiterable = not(isiterable);
const raisebadlisterror = exception('TypeError', ERR_BAD_LIST, typeorclassname);

/**
 * Apply the *predicate* function to each item in *sourcelist* and return `true` if and only if *predicate* returns a falsy
 * value for each item. This function is the counterpart to {@link module:any any()}.
 * 
 * If the *predicate* is <abbr title="null or undefined">void</abbr>, `none()` evaluates the boolish values of the
 * individual *sourcelist* items instead. If *predicate* is neither
 * <abbr title="null or undefined">void</abbr> nor a function, an error is thrown.
 * 
 * If the *sourcelist* is empty, `none()` returns `true`.
 * 
 * The function is short-circuited, so it returns `false` as soon as the *predicate* returns a truthy value, without
 * evaluating any remaining items in *sourcelist*.
 * 
 * `none()` is curried by default with unary arity.
 *
 * @example <caption>Example usage of `none()`</caption>
 * 
 * const { none } = require('functionish/lists')
 * 
 * const iseven = x => (x%2) === 0;
 *     
 * none(iseven, [1,3,7,42,9]); // returns false
 * none(iseven, [1,3,7,9]); // returns true
 * none(null, [1,3,7,9]); // returns false because the list contains truthy items
 * none(null, [0, '', -0, null, undefined, 0n, false]); // returns true because the list contains no truthy items
 *
 * @function none
 * @see {@link module:lists/any any()}
 * @see {@link module:lists/all all()}
 * @see {@link module:misc/resolve resolve()}
 * @param {(function|string)} [predicate] The predicate function
 * @param {iterable} sourcelist An iterable object producing the items to test
 * @returns {boolean} 
 */
function none(predicate, sourcelist) {

    if( issingleton(arguments) ) {
        return none.bind(null, predicate);
    } else if( notiterable(sourcelist) ) {
        raisebadlisterror(sourcelist); 
    } else if( isvoid(predicate) ) {
        for(const value of sourcelist) if( value ) return false;
    } else {
        for(const value of sourcelist) if( predicate(value) ) return false;
    }

    return true;
}

module.exports = none;