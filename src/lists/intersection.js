/**
 * @module lists/intersection
 */

'use strict';

const ERR_BAD_LIST = `functionish/lists/intersection(): The list has type %s. Expected an iterable object.`;

const and = require('../logic/and');
const bind = require('../bind');
const compose = require('../compose');
const exception = require('../errors/exception');
const hashset = require('../misc/hashset');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const isvoid = require('../types/isvoid');
const list = require('./list');
const or = require('../logic/or');
const resolve = require('../misc/resolve');
const tap = require('../tap');
const typeorclassname = require('../types/typeorclassname');
const uniqfilter = require('../misc/uniqfilter');
const validator = require('../errors/validator');

const intersectfilter = compose(bind('has'), hashset);
const isfunctionorvoid = or(isfunction, isvoid);

const validatelist = tap(
    validator(
        exception('TypeError', ERR_BAD_LIST, typeorclassname),
        isiterable
    )
)

const partialintersection = (hashfunc, list1) => _intersectionlist.bind(null, hashfunc, validatelist(list1));

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
 * If the *hashfunc* is a string, it is assumed to be the path to a function in a package or file module 
 * to be resolved using {@link module:misc/resolve resolve()}.
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
 * @see {@link module:misc/resolve resolve()}
 * @param {(function|string)} [hashfunc] The hashing function 
 * @param {iterable} list1 An iterable object to intersect with
 * @param {iterable} list2 Another iterable object to intersect with
 * @returns {iterable}
 */
function intersection(hashfunc, list1, list2) {

    isfunctionorvoid(hashfunc) || (hashfunc = resolve(hashfunc));

    let arity = arguments.length;

    return (arity === 1) ? intersection.bind(null, hashfunc)
         : (arity === 2) ? compose( partialintersection(hashfunc, list1), validatelist)
         : _intersectionlist(hashfunc, validatelist(list1), validatelist(list2));
}

function _intersectionlist(hashfunc, list1, list2) {

    return list(

        function* () {

            const isintersect = intersectfilter(hashfunc, list2);
            const isuniq = uniqfilter(hashfunc);
            const predicate = and(isintersect, isuniq);

            for (const item of list1) predicate(item) && (yield item);
        }
    )
}

module.exports = intersection;