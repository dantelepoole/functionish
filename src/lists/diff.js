/**
 * @module lists/diff
 */

'use strict';

const curry2 = require('../curry2');
const filter = require('./filter');
const hashset = require('../misc/hashset');
const uniqfilter = require('../misc/uniqfilter');


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

    const list2set = hashset(hashfunc, list2);
    const isuniq = uniqfilter(hashfunc, list2set);

    return filter(isuniq, list1);
});


module.exports = diff;