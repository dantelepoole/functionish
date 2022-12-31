/**
 * @module lists/dispense
 */

const DISPENSE_NONE = undefined;

'use strict';

module.exports = function dispense(list) {

    const iterator = list[Symbol.iterator]();

    return function() {

        const item = iterator.next();

        if( ! item.done ) return item.value;
    }
}