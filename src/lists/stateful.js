/**
 * @module lists/stateful
 */

'use strict';

const always = require('../always');
const compose = require('../compose');
const iterator = require('./iterator');
const list = require('./list');

const initstatefuliterator = compose(list, always, iterator);

/**
 * to do
 * 
 * @example <caption>Example usage of `stateful()`</caption>
 * 
 * to do
 * 
 * @function filter
 * @param {iterable} sourcelist An iterable object
 * @returns {iterable} 
 */
function stateful(sourcelist) {
    return initstatefuliterator(sourcelist);
}

module.exports = stateful;