/**
 * @module misc/clone
 */

'use strict';

const isarray = require('../types/isarray');

const notobject = obj => (typeof obj !== 'object' || obj === null);

/**
 * to do
 * [only string-keyed object properties]
 * 
 * @example <caption>Example usage of `clone()`</caption>
 * 
 * to do
 * 
 * @function clone
 * @param {any} source The value to clone
 * @returns {any}
 */
function clone(source) {

    const objectcache = new Map();

    return _clone(objectcache, source);
}

function _clone(cache, source) {

    return notobject(source) ? source
         : cache.has(source) ? cache.get(source)
         : isarray(source) ? clonearray(cache, _clone, source)
         : cloneobject(cache, _clone, source);
}


function cloneobject(cache, clone, source) {

    const target = {};

    cache.set(source, target);

    for(const key in source) target[key] = clone(cache, source[key]);
    
    return target;
}

function clonearray(cache, clone, source) {

    const target = new Array(source.length);

    cache.set(source, target);

    for(let i = 0; i < source.length; i += 1) target[i] = clone(cache, source[i]);

    return target;
}


module.exports = clone;