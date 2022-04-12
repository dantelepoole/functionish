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
 * @func separate
 * @param {function} predicate The predicate function to apply to each item in *list*
 * @param {any[]} list The list of items to separate
 * @returns {any[][]}
 */
module.exports = require('./curry2') (

    function separate(predicate, list) {

        let buffertrue = [];
        let bufferfalse = [];
        
        let index = 0;
        while(index < list.length) {

            const item = list[index];
            index += 1;

            const predicateresult = !! predicate(item);
            const targetbuffer = predicateresult ? buffertrue : bufferfalse;

            targetbuffer.push(item);
        }

        return [buffertrue, bufferfalse];
    }
)