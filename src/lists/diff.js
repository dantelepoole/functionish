/**
 * @module lists/diff
 */

'use strict';

const ERR_BAD_HASHFUNC = `functionish/lists/diff(): The hashing function has type %s. Expected a function.`;
const ERR_BAD_LIST1 = `functionish/lists/diff(): The list1 argument has type %s. Expected an iterable object.`;
const ERR_BAD_LIST2 = `functionish/lists/diff(): The list2 argument has type %s. Expected an iterable object.`;

const compose = require('../compose');
const curry2 = require('../curry2');
const error = require('../errors/error');
const hashset = require('../misc/hashset');
const isfunction = require('../types/isfunction');
const isiterablenotstring = require('../types/isiterablenotstring');
const isvoid = require('../types/isvoid');
const list = require('./list');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');
const uniqfilter = require('../misc/uniqfilter');

const raisebadhashfunction = compose(raise, error.Type(ERR_BAD_HASHFUNC), typeorclassname);
const raisebadlist1error = compose(raise, error.Type(ERR_BAD_LIST1), typeorclassname);
const raisebadlist2error = compose(raise, error.Type(ERR_BAD_LIST2), typeorclassname);

/**
 * Return a lazy iterable object that produces only those items from *list1* that are not present in *list2*, with
 * any duplicates removed, using the optional *hashfunc* to compare list items. If *hashfunc* is
 * <abbr title="null or undefined">void</abbr>, list items are compared using string equality.
 * 
 * `diff()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `diff()`</caption>
 * 
 * const { diff } = require('functionish/lists');
 * 
 * const list1 = [1,2,3,4,5];
 * const list2 = [3,4,5,6,7];
 * 
 * [ ...diff(null, list1, list2) ]; // returns [1,2]
 * 
 * list1.shift();
 * list1.shift();
 *  
 * [ ...diff(null, list1, list2) ]; // returns []
 * 
 * @example <caption>Example usage of `diff()` with a hashing function</caption>
 * 
 * const users1 = [ { id:1, name:'Fu' }, { id:2, name:'Fubar' }, { id:3, name:'Bar' } ];
 * const users2 = [ { id:2, name:'Fubar' }, { id:3, name:'Bar' }, { id:42, name:'Douglas Adams' } ];
 * const getuserid = user => user.id;
 * 
 * [ ...diff(getuserid, users1, users2) ]; // returns [ { id:1, name:'Fu' } ]
 * 
 * users1.shift();
 * 
 * [ ...diff(getuserid, users1, users2) ]; // returns []
 * 
 * @function diff
 * @param {function} [hashfunc=null] The hashing function
 * @param {iterable} list1 The first iterable
 * @param {iterable} list2 The second iterable
 * @returns {iterable}
 */
const diff = curry2(function diff(hashfunc=null, list1, list2) {

    isvoid(hashfunc) || isfunction(hashfunc) || raisebadhashfunction(hashfunc);
    isiterablenotstring(list1) || raisebadlist1error(list1);
    isiterablenotstring(list2) || raisebadlist2error(list2);

    return list(

        function* () {

            const list2set = hashset(hashfunc, list2);
            const isuniq = uniqfilter(null, list2set);

            for(const item of list1) isuniq(item) && (yield item);

        }
    )
});


module.exports = diff;