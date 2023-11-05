/**
 * @module lists/reverse
 */

'use strict';

const EMPTY_STRING = '';

const ERR_BAD_LIST = `functionish/lists/reverse(): The sourcelist argument has type %s. Expected an iterable object.`;

const error = require('../errors/error');
const isarray = require('../types/isarray');
const isiterable = require('../types/isiterable');
const isstring = require('../types/isstring');
const list = require('./list');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');

const raisebadlisterror = compose(raise, error.Type(ERR_BAD_LIST), typeorclassname);

/**
 * to do
 * 
 * @function reverse
 * @param {(iterable|string)} sourcelist An iterable object producing the items to reverse, or a string
 * @returns {(iterable|string)}
 */
function reverse(sourcelist) {

    return isstring(sourcelist) ? sourcelist.split(EMPTY_STRING).reverse().join(EMPTY_STRING)
         : isarray(sourcelist) ? sourcelist.slice().reverse()
         : isiterable(sourcelist) ? reverselist(sourcelist)
         : raisebadlisterror(sourcelist);
}

function reverselist(sourcelist) {

    return list(

        function* () {

            const items = Array.from(sourcelist);

            for(let i = items.length-1; i >= 0; i -= 1) yield items[i];
        }
    )
}

module.exports = reverse;