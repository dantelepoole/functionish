/**
 * @module lists/symdiff
 */

'use strict';

const bind = require('../bind');
const compose = require('../compose');
const curry = require('../curry');
const filter = require('./filter');
const hashset = require('../misc/hashset');
const list = require('./list');
const not = require('./not');
const uniqfilter = require('./uniqfilter');

const binddelete = bind('delete');
const difflistfromset = compose(list, bind('values'));

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
    const difflist2 = difflistfromset(itemset2);
    
    const isintersect = binddelete(itemset2);
    const list1filter = [ uniqfilter(hashfunc), not(isintersect) ];
    const difflist1 = filter(list1filter, list1);

    return concatlists(difflist1, difflist2)
}

function concatlists(list1, list2) {

    return list(
        function* (){
            yield* list1,
            yield* list2
        }
    )
}

module.exports = curry(2, symdiff);