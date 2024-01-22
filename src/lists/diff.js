/**
 * @module lists/diff
 */

'use strict';

const ERR_BAD_HASHFUNC = `functionish/lists/diff(): The hash function has type %s. Expected a function or null/undefined.`;
const ERR_BAD_LIST = `functionish/lists/diff(): The list argument has type %s. Expected an iterable object.`;

const compose = require('../compose');
const error = require('../errors/error');
const hashset = require('../misc/hashset');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const isvoid = require('../types/isvoid');
const list = require('./list');
const or = require('../logic/or');
const raise = require('../errors/raise');
const tap = require('../tap');
const typeorclassname = require('../types/typeorclassname');
const uniqfilter = require('../misc/uniqfilter');

const isfunctionorvoid = or(isfunction, isvoid);

const raisebadhashfuncerror = compose(raise, error.Type(ERR_BAD_HASHFUNC), typeorclassname);
const validatehashfunction = or(isfunctionorvoid, raisebadhashfuncerror);
const raisebadlisterror = compose(raise, error.Type(ERR_BAD_LIST), typeorclassname);
const validatelist = tap( or(isiterable, raisebadlisterror) );

const partialdiff = (hashfunc, list1) => _difflist.bind(null, hashfunc, validatelist(list1));

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
 * const difference = diff(null, list1, list2);
 * 
 * [...difference]; // returns [1,2]
 * 
 * list1.shift();
 * list1.shift();
 *  
 * [...difference]; // returns []
 * 
 * @example <caption>Example usage of `diff()` with a hashing function</caption>
 * 
 * const users1 = [ { id:1, name:'Fu' }, { id:2, name:'Fubar' }, { id:3, name:'Bar' } ];
 * const users2 = [ { id:2, name:'Fubar' }, { id:3, name:'Bar' }, { id:42, name:'Douglas Adams' } ];
 * const getuserid = user => user.id;
 * 
 * const difference = diff(getuserid, users1, users2);
 * 
 * [...difference] // returns [ { id:1, name:'Fu' } ]
 * 
 * users1.shift();
 * 
 * [...difference]; // returns []
 * 
 * @function diff
 * @see {@link module:misc/resolve resolve()}
 * @param {function} [hashfunc=null] The hashing function
 * @param {iterable} list1 The first iterable
 * @param {iterable} list2 The second iterable
 * @returns {iterable}
 */
function diff(hashfunc=null, list1, list2) {

    validatehashfunction(hashfunc);
    
    const arity = arguments.length;

    return (arity === 1) ? diff.bind(null, hashfunc)
         : (arity === 2) ? compose( partialdiff(hashfunc, list1), validatelist)
         : _difflist(hashfunc, validatelist(list1), validatelist(list2));
}

function _difflist(hashfunc, list1, list2) {

    return list(

        function* () {

            const list2set = hashset(hashfunc, list2);
            const isuniq = uniqfilter(null, list2set);

            for(const item of list1) isuniq(item) && (yield item);
        }
    )

}

module.exports = diff;