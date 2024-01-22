/**
 * @module lists/findindex
 */

'use strict';

const INDEX_NOT_FOUND = -1;

const isfunction = require('../types/isfunction');
const issingleton = require('../arrays/issingleton');

/**
 * If *sourcelist* has a `findIndex()` method, it is passed the *predicate* and the result is returned. Otherwise,
 * return the index of the first value in *sourcelistlist* for which the *predicate* function returns a truthy value
 * or `-1` if the *predicate* returns a falsy value for each item in the *sourcelist*.
 * 
 * `findindex()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `findindex()`</caption>
 *     
 * const { find } = require('functionish/lists');
 * 
 * const iseven = x => (x%2) === 0;
 * 
 * findindex(iseven, [1,2,3,4]); // returns 1
 * findindex(iseven, [1,3,5]); // returns -1
 * 
 * @function find
 * @see {@link module:misc/resolve resolve()}
 * @param {(function|string)} predicate The predicate function identifying the item being searched
 * @param {iterable} sourcelist The list of items to search
 * @returns {any}
 */
function findindex(predicate, sourcelist) {

    return issingleton(arguments) ? findindex.bind(null, predicate)
         : isfunction(sourcelist?.findIndex) ? sourcelist.findIndex(predicate)
         : _findindex(predicate, sourcelist);

}

function _findindex(predicate, sourcelist) {

    let index = INDEX_NOT_FOUND;

    for(const item of sourcelist) {
        index += 1;
        if( predicate(item) ) break;
    }

    return index;
}

module.exports = findindex;