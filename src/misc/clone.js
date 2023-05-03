/**
 * @module misc/clone
 */

'use strict';

const call = require('../call');
const isarray = require('../types/isarray');
const notobject = require('../types/notobject');

/**
 * to do
 * 
 * @example <caption>Example usage of `clone()`</caption>
 * 
 * to do
 * 
 * @function clone
 * @param {any} source The value to clone
 * @returns {any}
 */
// function clone(source) {
    
//     const clone_impl = clonefactory();

//     return clone_impl(source);
// }

// function clonefactory() {

//     const cache = new Map();

//     return function _clone(source) {

//         return notobject(source) ? source
//              : cache.has(source) ? cache.get(source)
//              : isarray(source) ? clonearray(cache, _clone, source)
//              : cloneobject(cache, _clone, source);
//     }
// }
function clone(source) {

    const objectcache = new Set();

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

    for(let index = 0; index < source.length; index += 1) target[index] = clone(cache, source[index]);

    return target;
}


module.exports = clone;