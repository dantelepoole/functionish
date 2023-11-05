/**
 * @module lists/take
 */

'use strict';

const THIS_NULL = null;

const curry = require('../curry');
const parseinteger = require('../math/parseinteger');
const list = require('./list');

/**
 * [to do]
 * 
 * @example <caption>Example usage of `take()`</caption>
 * 
 * [to do]
 * 
 * @function take
 * @param {number} itemcount The number of items to take
 * @param {iterable} targetlist The iterable to take the items from
 * @returns {iterable}
 */
function take(itemcount, targetlist) {

    itemcount = parseinteger(itemcount);

    return list(
        function* () {

            for(const item of targetlist) {
                if(itemcount-- > 0) yield item;
                else break;
            }
        }
    )
}

module.exports = curry(1, take);