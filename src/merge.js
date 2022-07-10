/**
 * @module map
 */
'use strict';

const assign = Object.assign;

/**
 * Merge the own, enumerable properties of all *source* objects into a new, single object.
 * 
 * This function uses {@link external:Object.assign Object.assign()} to merge the source objects. This means that the
 * properties of later *sources* will override properties of earlier *sources* that have the same key.
 * 
 * If no *sources* are passed, an empty object is returned.
 * 
 * @func merge
 * @param  {...object} sources Two or more objects to merge
 * @returns {object}
 */
module.exports = function merge(...sources) {
    return assign({}, ...sources);
}