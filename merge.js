/**
 * @module merge
 */

'use strict';

const curry2 = require('./curry2');

/**
 * Copy the own, enumerable properties of the *sources* to a new object. Properties of earlier *source* object will
 * be overwritten by properties of later *source* objects that have the same key.
 * 
 * `merge()` is curried by default with binary arity.
 * 
 * @func merge
 * @param {...obj[]} sources Two or more objects to merge
 * @returns {object} A new object 
 */
module.exports = curry2(

    function merge(...sources) {
        return Object.assign( {}, ...sources );
    }
)