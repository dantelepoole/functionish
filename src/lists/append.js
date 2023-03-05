/**
 * @module lists/append
 */

'use strict';

const EMPTY_STRING = '';

const isarray = require('../types/isarray');
const isstring = require('../types/isstring');
const tostring = require('../types/tostring');

const stringappendreducer = (string, partialstring) => string + tostring(partialstring);

/**
 * to do
 * 
 * @function append
 */
function append(list, ...items) {

    return isarray(list) ? [...list, ...items]
         : isstring(list) ? appendstrings(list, items)
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