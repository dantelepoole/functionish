/**
 * @module lists/symdiff
 */

'use strict';

const ERR_BAD_LIST = `functionish/lists/symdiff(): The list has type %s. Expected an iterable object.`;

const and = require('../logic/and');
const bind = require('../bind');
const compose = require('../compose');
const error = require('../errors/error');
const filter = require('./filter');
const hashset = require('../misc/hashset');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const isvoid = require('../types/isvoid');
const list = require('./list');
const not = require('../logic/not');
const or = require('../logic/or');
const raise = require('../errors/raise');
const resolve = require('../misc/resolve');
const uniqfilter = require('../misc/uniqfilter');
const tap = require('../tap');
const typeorclassname = require('../types/typeorclassname');

const binddelete = bind('delete');
const difflistfromset = compose(list, bind('values'));

const isfunctionorvoid = or(isfunction, isvoid);

const raisebadlisterror = compose(raise, error.Type(ERR_BAD_LIST), typeorclassname);
const validatelist = tap( or(isiterable, raisebadlisterror) );

const partialsymdiff = (hashfunc, list1) => _symdiff.bind(null, hashfunc, validatelist(list1));

/**
 * Return a lazy iterable object that produces only those items from both *list*s that are not present in the other
 * *list*, with any duplicates removed, using the optional *hashfunc* to compare list items.
 * 
 * If *hashfunc* is <abbr title="null or undefined">void</abbr>, list items are compared using string equality.
 * If the *hashfunc* is a string, it is assumed to be the path to a function in a package or file module 
 * to be resolved using {@link module:misc/resolve resolve()}.
 * 
 * `symdiff()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `symdiff()`</caption>
 * 
 * const { symdiff } = require('functionish/lists');
 * 
 * const list1 = [1,2,3,4,5];
 * const list2 = [3,4,5,6,7];
 * 
 * const symdifference = symdiff(null, list1, list2);
 * [ ...symdiffdifference ]; // returns [1,2,6,7]
 * 
 * list1.shift();
 * list1.shift();
 *  
 * [ ...symdiffdifference ]; // returns [6,7]
 * 
 * @example <caption>Example usage of `symdiff()` with a hashing function</caption>
 * 
 * const users1 = [ { id:1, name:'Fu' }, { id:2, name:'Fubar' }, { id:3, name:'Bar' } ];
 * const users2 = [ { id:2, name:'Fubar' }, { id:3, name:'Bar' }, { id:42, name:'Douglas Adams' } ];
 * const getuserid = user => user.id;
 * 
 * const symdifference = (getuserid, users1, users2);
 * [ ...symdifference ]; // returns [ { id:1, name:'Fu' } ]
 * 
 * users1.shift();
 * 
 * [ ...symdifference ]; // returns []
 * 
 * @function symdiff
 * @see {@link module:misc/resolve resolve()}
 * @param {function} [hashfunc=null] The hashing function
 * @param {iterable} list1 The first iterable
 * @param {iterable} list2 The second iterable
 * @returns {iterable}
 */
function symdiff(hashfunc=null,list1, list2) {

    isfunctionorvoid(hashfunc) || (hashfunc = resolve(hashfunc));

    const arity = arguments.length;

    return (arity === 1) ? symdiff.bind(null, hashfunc)
         : (arity === 2) ? compose( partialsymdiff(hashfunc, list1), validatelist)
         : _symdiff(hashfunc, validatelist(list1), validatelist(list2));
}

function _symdiff(hashfunc,list1,list2) {

    return list( function* _symdifflist() {

        const itemset2 = hashset(hashfunc, list2);
        const difflist2 = difflistfromset(itemset2);
        
        const isintersect = binddelete(itemset2);
        const list1filter = and( uniqfilter(hashfunc), not(isintersect) );
        const difflist1 = filter(list1filter, list1);
    
        // return concatlists(difflist1, difflist2)
        yield* difflist1,
        yield* difflist2
    })
}

// function builddifffilter(isuniq, listfilter, sourcelist) {

//     return list(
//         function* _difffilter() {
//             for(const item of sourcelist) listfilter(item) && (yield item);
//             isuniq.clear();
//         }
//     )
// }

// function concatlists(list1, list2) {

//     return list(
//         function* (){
//             yield* list1,
//             yield* list2
//         }
//     )
// }

module.exports = symdiff;