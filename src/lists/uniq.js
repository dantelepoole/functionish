/**
 * @module lists/uniq
 */

'use strict';

const ERR_BAD_SOURCELIST = `functionish/lists/uniq(): The source list has type %s. Expected an iterable object.`;

const compose = require('../compose');
const curry1 = require('../curry1');
const error = require('../errors/error');
const isiterablenotstring = require('../types/isiterablenotstring');
const list = require('./list');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');
const uniqfilter = require('../misc/uniqfilter');

const raisebadsourcelisterror = compose(raise, error.Type(ERR_BAD_SOURCELIST), typeorclassname);

/**
 * Return a lazy iterable object that discards any duplicate items in the *sourcelist*, using the optional *hashfunc*
 * to compare items. If the *hashfunc* is <abbr title="null or undefined">void</abbr>, the items are compared using
 * strict equality.
 * 
 * `uniq()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `uniq()`</caption>
 * 
 * const { uniq } = require('functionish/lists');
 * 
 * const numbers = [1,2,2,3,3,3,4,4,4,4,5,5,5,5];
 * [ ...uniq(null, numbers) ]; // returns [1,2,3,4,5] 
 * 
 * numbers.slice(3);
 * 
 * [ ...uniq(null,numbers) ]; // returns [3,4,5]
 * 
 * @example <caption>Example usage of `uniq()` with a hashing function</caption>
 * 
 * const users = [ { id:1, name:'Fu' }, { id:1, name:'Fu Again' }, { id:2, name:'Fubar' } ];
 * const getuserid = user => user.kd;
 * 
 * [ ...uniq(getuserid, users) ]; // returns [ { id:1, name:'Fu' }, { id:2, name:'Fubar' } ];
 * 
 * users.shift();
 * 
 * [ ...uniq(getuserid, users) ]; // returns [ { id:1, name:'Fu Again' }, { id:2, name:'Fubar' } ];
 * 
 * @function uniq
 * @param {function} [hashfunc=null] An optional hashing function or `null` to compare with strict equality
 * @param {iterable} sourcelist An iterable object producing the items to deduplicate
 * @returns {iterable}
 */
const uniq = curry1(function uniq(hashfunc=null, sourcelist) {

    isiterablenotstring(sourcelist) || raisebadsourcelisterror(sourcelist);

    const isuniq = uniqfilter(hashfunc);

    return list(

        function* () {
            for(const item of sourcelist) isuniq(item) && (yield item);
            isuniq.clear();
        }
    )
});

module.exports = uniq;