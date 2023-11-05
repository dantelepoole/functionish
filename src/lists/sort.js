/**
 * @module lists/sort
 */

'use strict';

const isfunction = require('../types/isfunction');
const list = require('./list');

const sortself = (sortfunc, sortable) => isfunction(sortfunc)
                                       ? sortable.slice().sort(sortfunc)
                                       : sortable.slice().sort();

/**
 * to do
 * 
 * @function sort
 * @param {iterable} targetlist An iterable object producing the items to sort
 * @returns {iterable}
 */
function sort(sortfunc, targetlist) {

    return isfunction(targetlist.sort)
         ? sortself(sortfunc, targetlist)
         : sortlist(sortfunc, targetlist);
}

function sortlist(sortfunc, targetlist) {

    return list(

        function* () {
            
            const sortable = Array.from(targetlist);
            
            yield* isfunction(sortfunc)
                 ? sortable.sort(sortfunc)
                 : sortable.sort();
        }
    )
}

module.exports = sort;