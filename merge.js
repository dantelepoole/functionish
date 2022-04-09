'use strict';

const assign = Object.assign;

/**
 * Merge the own, enumerable properties of all *source* objects into a new, single object.
 * 
 * This function uses {@link external:Object.assign Object.assign()} to merge the source objects.
 * 
 * @module merge
 * @param  {...object} sources Two or more objects to merge
 * @returns {object}
 */
module.exports = function merge(...sources) {
    return assign({}, ...sources);
}