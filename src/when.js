/**
 * @module when
 */

'use strict';

const THIS_NULL = null;

const curry = require('./curry');
const id = require('./id');

const isfunction = require('./types/isfunction');

/**
 * to do
 * 
 * @example <caption>Example usage of `when()`</caption> 
 *     
 * to do
 * 
 * @function when
 * @returns {function}
 */
function when(condition, truebranch, falsebranch) {

    return isfunction(condition) ? dynamicwhen(...arguments)
         : condition ? truebranch
         : falsebranch;
}

function dynamicwhen(condition, truebranch, falsebranch) {

    (arguments.length >= 3) || (falsebranch = id);

    return _when.bind(THIS_NULL, condition, truebranch, falsebranch);
}

function _when(condition, truebranch, falsebranch, ...args) {

    const selectedbranch = condition(...args) ? truebranch : falsebranch;

    return isfunction(selectedbranch)
         ? selectedbranch(...args)
         : selectedbranch;
}

module.exports = curry(1, when);