/**
 * @module misc/merge
 */

'use strict';

/**
 * Copy the own, enumerable properties of each object in the *sources* array to a new object.
 * Properties of earlier *source* object will be overwritten by properties of later *source*
 * objects that have the same key.
 * 
 * The objects in the *sources* array are not altered.
 * 
 * @example <caption>Example usage of `merge()`</caption>
 * 
 * const { merge } = require('functionish/misc');
 * 
 * const firstname = { firstname:'Hari' }
 * const lastname = { lastname:'Seldon' }
 * 
 * merge(firstname, lastname);
 * // returns { firstname:'Hari', lastname:'Seldon' }
 * 
 * @function merge
 * @param {...object[]} sources The objects to merge
 * @returns {object} 
 */
function merge(...sources) {
    return Object.assign( {}, ...sources );
}

module.exports = merge;