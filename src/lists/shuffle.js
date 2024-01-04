/**
 * @module lists/shuffle
 */

'use strict';

const ERR_BAD_LIST = `functionish/lists/shuffle(): The source list has type %s. Expected an iterable object.`;

const exception = require('../errors/exception');
const isiterable = require('../types/isiterable');
const typeorclassname = require('../types/typeorclassname');
const validator = require('../errors/validator');

const randomitemshuffle = () => (Math.random() - 0.5);
const validatelist = validator(
    exception('TypeError', ERR_BAD_LIST, typeorclassname),
    isiterable
)


/**
 * Return an array containing the items from *sourcelist* shuffled randomly.
 * 
 * @function shuffle
 * @param {iterable} sourcelist An iterable object with the items to sort
 * @returns {any[]}
 */
function shuffle(sourcelist) {

    validatelist(sourcelist);

    return Array.from(sourcelist).sort(randomitemshuffle);
}

module.exports = shuffle;