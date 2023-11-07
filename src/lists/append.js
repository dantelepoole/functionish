/**
 * @module lists/append
 */

'use strict';

const EMPTY_STRING = '';

const isstring = require('../types/isstring');
const list = require('./list');

/**
 * to do
 * 
 * @function append
 */
function append(base, ...items) {

    return isstring(base)
         ? base + items.join(EMPTY_STRING)
         : appendlists(base, items);
}

function appendlists(list1, list2) {
    
    return list(

        function* () {

            yield* list1;
            yield* list2;
        }
    )
}

module.exports = append;