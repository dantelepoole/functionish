/**
 * @module lists/find
 */

'use strict';

const ERR_BAD_LIST = `functionish/lists/find(): The source list has type %s. Expected an iterable object.`;

const exception = require('../errors/exception');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const issingleton = require('../arrays/issingleton');
const resolve = require('../misc/resolve');
const typeorclassname = require('../types/typeorclassname');

const raisebadlisterror = exception('TypeError', ERR_BAD_LIST, typeorclassname);

/**
 * If *sourcelist* has a `find()` method, it is passed the *predicate* and the result is returned. Otherwise, return the first
 * value in *sourcelist* for which the *predicate* function returns a truthy value, or `undefined` if no such value is found.
 * 
 * If the *predicate* is not a function, it is assumed to be the path to a function in a package or file module 
 * to be resolved using {@link module:misc/resolve resolve()}.
 * 
 * `find()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `find()`</caption>
 *     
 * const { find } = require('functionish/lists');
 * 
 * const iseven = x => (x%2) === 0;
 * 
 * find(iseven, [1,2,3,4]); // returns 2
 * find(iseven, [1,3,5]); // returns `undefined`
 * 
 * @function find
 * @see {@link module:misc/resolve resolve()}
 * @param {function} predicate The predicate function identifying the item being searched
 * @param {iterable} sourcelist The list of items to search
 * @returns {any}
 */
function find(predicate, sourcelist) {

    isfunction(predicate) || (predicate = resolve(predicate));

    return issingleton(arguments) ? find.bind(null, predicate)
         : isfunction(sourcelist?.find) ? sourcelist.find(predicate)
         : isiterable(sourcelist) ? findlist(predicate, sourcelist)
         : raisebadlisterror(sourcelist);
}

function findlist(predicate, sourcelist) {
    for(const item of sourcelist) if( predicate(item) ) return item;
}

module.exports = find;