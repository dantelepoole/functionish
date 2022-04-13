/**
 * @module separate
 */

'use strict';

/**
 * Separate the items in *list* in two separate arrays depending on whether or not *predicate* accepts or rejects an
 * item. The return value is a two-item array with the first array containing an array of items for which *predicate*
 * returned `true` and the second containing an array of items for which *predicate* returned `false`.
 * 
 * `predicate()` is curried by default.
 * 
 * @example
 * 
 * const separate = require('./separate');
 * 
 * function iseven(x) { return (x%2) === 0; }
 * 
 * const numbers = [1,2,3,4,5,6,7,8,9,10];
 * 
 * const [evennumbers, oddnumbers] = separate(iseven, numbers);
 * 
 * // evennumbers: [2,4,6,8,10]
 * // oddnumbers: [1,3,5,7,9]
 * 
 * @func separate
 * @param {function} predicate The predicate function to apply to each item in *list*
 * @param {any[]} list The list of items to separate
 * @returns {any[][]}
 */
module.exports = require('./curry2') (

    function separate(predicate, list) {

        let buffertrue = [];
        let bufferfalse = [];
        
        for( const item of list ) {
            const targetbuffer = !! predicate(item) ? buffertrue : bufferfalse;
            targetbuffer.push(item);
        }

        return [buffertrue, bufferfalse];
    }
)