/**
 * @module unless
 */

'use strict';

const THIS_NULL = null;

const curry = require('./curry');
const isfunction = require('./types/isfunction');
const not = require('./logic/not');

const notfunction = not(isfunction);

/**
 * to do
 * 
 * @example <caption>Example usage of `unless()`</caption> 
 *     
 * to do
 * 
 * @function unless
 * @returns {function}
 */
function unless(condition, falsebranch, truebranch) {

    return isfunction(condition) ? _unless.bind(THIS_NULL, condition, truebranch, falsebranch)
         : condition ? truebranch
         : falsebranch;
}

function _unless(condition, falsebranch, truebranch, ...args) {

    const selectedbranch = condition(...args) ? truebranch : falsebranch;

    return isfunction(selectedbranch)
         ? selectedbranch(...args)
         : selectedbranch;
}

module.exports = curry(1, unless);