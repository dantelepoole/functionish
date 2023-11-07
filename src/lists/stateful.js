/**
 * @module lists/stateful
 */

'use strict';

const always = require('../always');
const iterator = require('./iterator');
const list = require('./list');

/**
 * to do
 * 
 * @example <caption>Example usage of `stateful()`</caption>
 * 
 * to do
 * 
 * @function filter
 * @param {iterable} targetlist An iterable object
 * @returns {iterable} 
 */
function stateful(targetlist) {

    let targetiterator = iterator(targetlist);

    return list( always(targetiterator) );
}

module.exports = stateful;