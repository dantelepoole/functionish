/**
 * @module misc/merge
 */

'use strict';

/**
 * Copy the own, enumerable properties of the *sources* to a new object. Properties of earlier *source* object will
 * be overwritten by properties of later *source* objects that have the same key.
 * 
 * @example
 * 
 * const merge = require('functionish/misc/merge');
 * 
 * merge( { firstname:'Hari' }, { lastname:'Seldon' }); // returns { firstname:'Hari', lastname:'Seldon' }
 * 
 * @func merge
 * @param {...obj[]} sources Two or more objects to merge
 * @returns {object} A new object 
 */
module.exports = function merge(...sources) {
    return Object.assign( {}, ...sources );
}