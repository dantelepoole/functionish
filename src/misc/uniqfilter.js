/**
 * @module misc/uniqfilter
 */

'use strict';

const ERR_BAD_HASHFUNCTION = `functionish/misc/uniqfilter(): The hash function has type %s. Expected a function.`;
const ERR_BAD_DUPLICATES = `functionish/misc/uniqfilter(): The duplicates set has type %s. Expected a Javascript native Set.`;

const compose = require('../compose');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const isvoid = require('../types/isvoid');
const raise = require('../errors/raise');
const type = require('../types/type');
const typeorclassname = require('../types/typeorclassname');

const isset = x => (x instanceof Set);
const throwhashfunctionerror = compose(raise, error.Type(ERR_BAD_HASHFUNCTION), type);
const throwduplicateserror = compose(raise, error.Type(ERR_BAD_DUPLICATES), typeorclassname);

/**
 * Return a filter function that accepts only unique values and rejects duplicates. If no *hashfunc*
 * is passed, the filter compares values using strict equality. Otherwise, it compare values by the
 * hash values returned by *hashfunc*.
 * 
 * The returned filter function maintains a cache of all values passed through the filter. So you should never keep
 * a uniqfilter around indefinitely, that would cause a memory leak. Instead, call `uniqfilter()` to create a
 * new filter each time you need one.
 * 
 * For the same reason, a uniq-instance is not reusable, since on subsequent runs it will recognize the values
 * from earlier runs as being duplicates.
 * 
 * @example <caption>Example usage of `uniqfilter()`</caption>
 * 
 * const { uniqfilter } = require('functionish/misc');
 * 
 * [1,2,2,3,3,3,4,4,4,4,5,5,5,5,5].filter( uniqfilter() ); // returns [1,2,3,4,5]
 * 
 * @example <caption>Example usage of `uniqfilter()` with a hashing function</caption>
 * 
 * const { uniqfilter } = require('functionish/misc');
 * 
 * const getid = x => x.id;
 * [ {id:42}, {id:43}, {id:42} ].filter( uniqfilter(getid) ); // returns [ {id:42}, {id:43} ]
 * 
 * @function uniqfilter
 * @param {function} [hashfunc=null] The hashing function
 * @param {Set} [duplicates] A Set containing the initial duplicate items
 * @returns {function}
 */
function uniqfilter(hashfunc, duplicates=new Set()) {

    const isuniq = value => !duplicates.has(value) && !!duplicates.add(value);

    isset(duplicates) || throwduplicateserror(duplicates);
    
    return isfunction(hashfunc) ? compose(isuniq, hashfunc)
         : isvoid(hashfunc) ? isuniq
         : throwhashfunctionerror(hashfunc);

}


module.exports = uniqfilter;