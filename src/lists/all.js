/**
 * @module lists/all
 */

'use strict';

const ERR_BAD_LIST = `functionish/lists/all(): The source list has type %s. Expected an iterable object.`;

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
 * Functional variant of {@link external:Array.prototype.every() Array.prototype.every()}. Apply the *predicate*
 * function to each item in *sourcelist* and return `true` if and only if *predicate* returns `true` each time. Otherwise,
 * return `false`.
 * 
 * If the *predicate* is <abbr title="null or undefined">void</abbr>, `all()` evaluates the boolish values of the
 * individual *sourcelist* items instead. * If the *predicate* is a string, it is assumed to be the path to a function in a package or file module 
 * to be resolved using {@link module:misc/resolve resolve()}. If *predicate* is neither <abbr title="null or undefined">void</abbr> nor a
 * function or a string, an error is thrown.
 * 
 * If the *sourcelist* is empty, `all()` returns `true`.
 * 
 * The function is short-circuited, so it returns `false` as soon as the *predicate* returns a falsy value, without
 * evaluating any remaining items in *sourcelist*.
 * 
 * `all()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `all()`</caption>
 * 
 * const { all } = require('functionish/lists')
 * 
 * const iseven = x => (x%2) === 0;
 *     
 * all(iseven, [2,4,6]); // returns true
 * all(iseven, [1,42,3]);  // returns true
 * 
 * all(null, [true, 'true', 1]); // returns true because all list items are truthy
 * all(null, [0, 1]); // returns false because the first list item is falsy
 * 
 * @function all
 * @see {@link module:any any()}
 * @see {@link module:none none()}
 * {@link module:misc/resolve resolve()}
 * @param {(function|string)} [predicate=undefined] The predicate function
 * @param {iterable} sourcelist An iterable object producing the items to test
 * @returns {boolean}
 */
function all(predicate, sourcelist) {

    isstring(predicate) && (predicate = resolve(predicate));
    
    if( issingleton(arguments) ) {
        return all.bind(null, predicate);
    } else if( notiterable(sourcelist) ) {
        raisebadlisterror(sourcelist); 
    } else if( isvoid(predicate) ) {
        for(const value of sourcelist) if( !value ) return false;
    } else {
        for(const value of sourcelist) if( !predicate(value) ) return false;
    }

    return true;
};

module.exports = all;