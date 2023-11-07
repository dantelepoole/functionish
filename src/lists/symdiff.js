/**
 * @module lists/symdiff
 */

'use strict';

const bind = require('../bind');
const curry = require('../curry');
const filter = require('./filter');
const hashset = require('../misc/hashset');
const list = require('./list');
const not = require('./not');
const uniqfilter = require('./uniqfilter');

/**
 * [to do]
 * 
 * @example <caption>Example usage of `symdiff()`</caption>
 * 
 * [to do]
 * 
 * @function symdiff
 * @param {function} [hashfunc] The hashing function
 * @param {iterable} list1 The first iterable
 * @param {iterable} list2 The second iterable
 * @returns {iterable}
 */
function symdiff(hashfunc,list1, list2) {

    const itemset2 = hashset(hashfunc, list2);
    const list2diff = list( bind('values', itemset2) );
    
    const isintersect = bind('delete', itemset2);
    const isuniq = uniqfilter(hashfunc);

    const list1filter = [isuniq, not(isintersect)];
    const list1diff = filter(list1filter, list1 );

    return concatlists(list1diff, list2diff)
}

function concatlists(list1, list2) {

    return list(
        function* (){
            yield* list1diff,
            yield* list2diff
        }
    )
}

module.exports = curry(2, symdiff);