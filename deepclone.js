/**
 * @module deepclone
 */

'use strict';

const isarray = require('./isarray');
const partial = require('./partial');

/**
 * Return a deep clone of *source*. If *source* does not have type 'object', *source* itself is returned. If *source*
 * is an array, a deep clone of the array is returned. If *source* is an object, it's own enumerable properties are
 * individually cloned.
 * 
 * This is a rather simple cloning algorithm, well-suited only for POJO's. Methods on *source* are copied by reference
 * and any getter-properties are executed and their return value copied.
 * 
 * The cloning algorithm does protect against circular references.
 * 
 * @func deepclone
 * @param {any} source The value to clone
 * @returns {any}
 */
module.exports = function deepclone(source) {
    return deepclonesafe( new WeakMap(), source );
}

function deepclonesafe(cache, source) {

    return (typeof source !== 'object' || source === null) ? source
         : isarray(source) ? source.map( partial(deepclonesafe, cache) )
         : deepcloneobject(cache, source);
}

function deepcloneobject(cache, source) {

    if( cache.has(source) ) return cache.get(source);

    const target = {};

    cache.set(source, target);

    for( const key of Object.keys(source) ) target[key] = deepclonesafe(cache, source[key]);

    return target;
}