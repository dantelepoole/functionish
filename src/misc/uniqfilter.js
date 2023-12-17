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
 * The returned filter function has a `clear()` method to clear its internal cache of duplicate items.
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
 * @example <caption>Example usage of `uniqfilter()` with the `clear() method</caption>
 * 
 * const { uniqfilter } = require('functionish/misc');
 * 
 * const dedup = uniqfilter();
 * 
 * [1,2,2,3,3,3,4,4,4,4,5,5,5,5,5].filter( dedup ); // returns [1,2,3,4,5]
 * 
 * [1,2,2,3,3,3,4,4,4,4,5,5,5,5,5].filter( dedup ); // returns []
 * 
 * dedup.clear();
 * [1,2,2,3,3,3,4,4,4,4,5,5,5,5,5].filter( dedup ); // returns [1,2,3,4,5]
 * 
 * @function uniqfilter
 * @param {function} [hashfunc=null] The hashing function
 * @param {Set} [duplicates] A Set containing the initial duplicate items
 * @returns {function}
 */
function uniqfilter(hashfunc, duplicates=new Set()) {

    isset(duplicates) || throwduplicateserror(duplicates);

    return isvoid(hashfunc) ? buildisuniq(duplicates)
         : isfunction(hashfunc) ? buildhashedisuniq(hashfunc, duplicates)
         : throwhashfunctionerror(hashfunc);
}

function buildisuniq(duplicates) {

    const isuniq = value => !duplicates.has(value) && !!duplicates.add(value);

    isuniq.clear = duplicates.clear.bind(duplicates);
    
    return isuniq;
}

function buildhashedisuniq(hashfunc, duplicates) {

    const isuniq = compose(value => !duplicates.has(value) && !!duplicates.add(value), hashfunc);
    
    isuniq.clear = duplicates.clear.bind(duplicates);

    return isuniq;    
}

module.exports = uniqfilter;