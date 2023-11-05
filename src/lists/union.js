/**
 * @module lists/union
 */

'use strict';

const compose = require('../compose');
const curry = require('../curry');
const list = require('./list');
const partial = require('../partial');
const uniq = require('./uniq');

const unionlist = compose(list, concatlists);

/**
 * [to do]
 * 
 * @example <caption>Example usage of `union()`</caption>
 * 
 * [to do]
 * 
 * @function union
 * @see {@link module:append append()}
 * @param {function} hashfunc The hashing function or `'strict'` to use strict equality
 * @param {iterable} list1 The first iterable of items to combine
 * @param {iterable} list2 The second iterable of items to combine
 * @returns {iterable}
 */
function union(hashfunc, ...lists) {
    return uniq(hashfunc, unionlist(lists));
}

function concatlists(lists) {
 
    return function* () {
        for(let i = 0; i < lists.length; i += 1) yield* lists[i];
    }
}

module.exports = curry(1, union);