/**
 * @module lists/concat
 */

'use strict';

const EMPTY_STRING = '';

const isarray = require('../types/isarray');
const isstring = require('../types/isstring');
const list = require('../lists/list');

const isconcatspreadable = obj => isarray(obj) || obj?.[Symbol.isConcatSpreadable];

/**
 * Similar to {@link module:lists/append() append()} except that concat-spreadable *items* are flattened before being
 * concatenated.
 * 
 * If the first item is a string, the return value will also be a string containing the *items* in order. Otherwise,
 * a lazy iterable object is returned that iterates over the *items*. In both cases, any *items* with a
 * `Symbol.isConcatSpreadable` property set to a truthy value are flattened by one level before being concatenated.
 *  
 * The returned list will be lazy, meaning that any changes to the contents of iterable arguments will be reflected in
 * subsequent iterations of the returned list.
 * 
 * @example <caption>Example usage of `concat()`</caption>
 * 
 * const { concat } = require('functionish/lists');
 * 
 * const numberlist = concat([1,2], 3, 4, [5,6]); 
 * [...numberlist]; // [1,2,3,4,5,6]
 * 
 * const numberlist2 = concat( [1,2], 3, [4, [5,6]] );
 * [...numberlist2]; // [1,2,3,4,[5,6]] because the flattening does not recurse
 * 
 * concat( 'fu','bar', ['and', 'foo', 'bar'] ); // returns 'fubarandfoobar'
 * 
 * @function concat
 * @param  {...any[]} items The items to concatenate
 * @returns {iterable}
 */
function concat(...items) {
    
    return isstring(items[0]) 
         ? items.flat(1).join(EMPTY_STRING)
         : concatlists(items);
}

function concatlists(items) {

    return list(
        function* () {
            for(const item of items) isconcatspreadable(item) ? yield* item : yield item;
        }
    )
}

module.exports = concat;