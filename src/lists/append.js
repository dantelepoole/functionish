/**
 * @module lists/append
 */

'use strict';

const TYPE_STRING = '';

const tostring = require('../types/tostring');

const isstring = x => (typeof x === TYPE_STRING);
const stringappendreducer = (string, part) => string + tostring(part);

/**
 * to do
 * 
 * @function append
 */
function append(list, ...items) {

    return isstring(list)
         ? appendstrings(list, items)
         : appenditerable(list, items);
}

function appendstrings(string, items) {
    return items.reduce(stringappendreducer, string);
}

function appenditerable(list1, items) {

    return {
        [Symbol.iterator] : function* () {
            yield* list1;
            yield* items;
        }
    }
}

module.exports = append;