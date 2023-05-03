/**
 * @module lists/sort
 */

'use strict';

const TYPE_FUNCTION = 'function';

const isarray = require('../types/isarray');

const sortarray = (sortfunc, array) => (typeof sortfunc === TYPE_FUNCTION)
                                     ? array.slice().sort(sortfunc)
                                     : array.slice().sort();

/**
 * to do
 * 
 * @function sort
 * @param {iterable} list An iterable object producing the items to sort
 * @returns {iterable}
 */
function sort(sortfunc, list) {

    return isarray(list)
         ? sortarray(sortfunc, list)
         : sortlist(sortfunc, list);
}

function sortlist(sortfunc, list) {

    return {

        *[Symbol.iterator]() {
            
            yield* (typeof sortfunc === TYPE_FUNCTION)
                 ? Array.from(list).sort(sortfunc)
                 : Array.from(list).sort();
        }
   }
}

module.exports = sort;