/**
 * @module lists/diff
 */

'use strict';

const curry = require('../curry');
const filter = require('./filter');
const hashset = require('../misc/hashset');
const uniqfilter = require('../misc/uniqfilter');


/**
 * to do
 *  
 * @function diff
 * @param {function} [hashfunc] The hashing function
 * @param {iterable} list1 The first iterable
 * @param {iterable} list2 The second iterable
 * @returns {iterable}
 */
function diff(hashfunc, list1, list2) {

    const list2set = hashset(hashfunc, list2);
    const isuniq = uniqfilter(hashfunc, list2set);

    return filter(isuniq, list1);
}


module.exports = curry(2, diff);