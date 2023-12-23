/**
 * @module lists/intersection
 */

'use strict';

const ERR_BAD_HASHFUNC = `functionish/lists/intersection(): The hashing function has type %s. Expected a function.`;
const ERR_BAD_LIST = `functionish/lists/intersection(): The list has type %s. Expected an iterable object.`;

const and = require('../logic/and');
const bind = require('../bind');
const compose = require('../compose');
const curry2 = require('../curry2');
const exception = require('../errors/exception');
const hashset = require('../misc/hashset');
const isdefined = require('../types/isdefined');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const isvoid = require('../types/isvoid');
const list = require('./list');
const or = require('../logic/or');
const typeorclassname = require('../types/typeorclassname');
const uniqfilter = require('../misc/uniqfilter');
const validator = require('../errors/validator');

const intersectfilter = compose( bind('has'), hashset );

const validatehashfunc = validator(
    exception('TypeError', ERR_BAD_HASHFUNC, typeorclassname),
    or(isfunction, isvoid)
)

const validatelist = validator(
    exception('TypeError', ERR_BAD_LIST, typeorclassname),
    isiterable
)

/**
 * Return an iterable producing all items common to both *list1* and *list2*, but without duplicates.
 * 
 * If *hashfunc* is `strict` (default), the list items are compared with strict
 * equality (`===`). Otherwise, the items' hash results are compared instead. Therefore, *hashfunc*
 * should be collision-free (i.e. never return the same hash value for different arguments) and should
 * always return the same hash value when passed the same argument multiple times.
 * 
 * If *list1* is an array, an array is returned. Otherwise, *list1* and *list2* are presumed to be
 * iterable objects and an iterable object is returned that operates lazily.
 * 
 * `intersection()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `intersection()`</caption>
 * 
 * const { intersection } = require('functionish/lists');
 * 
 * const result = intersection('strict', [1,2,3,4,5], [3,4,5,6,7]);
 * Array.from(result); // returns [3,4,5]
 * 
 * @function intersection
 * @param {function} [hashfunc] The hashing function 
 * @param {iterable} list1 An iterable object to intersect with
 * @param {iterable} list2 Another iterable object to intersect with
 * @returns {iterable}
 */
const intersection = curry2(function intersection(hashfunc, list1, list2) {

    validatehashfunc(hashfunc);
    validatelist(list1);
    validatelist(list2);

    return list(

        function* () {

            const isintersect = intersectfilter(hashfunc, list2);
            const isuniq = uniqfilter(hashfunc);
            const predicate = and(isintersect, isuniq);

            for(const item of list1) predicate(item) && (yield item);
        }
    )
})

module.exports = intersection;