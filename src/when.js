/**
 * @module when
 */

'use strict';

const always = require('./always');
const curry = require('./curry');
const id = require('./id');
const isfunction = require('./types/isfunction');
const notfunction = require('./types/notfunction');

const conditional = (condition, truebranch, falsebranch, ...args) => condition(...args)
                                                                   ? truebranch(...args)
                                                                   : falsebranch(...args);

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

    return notfunction(condition) ? condition ? truebranch : falsebranch
         : (arguments.length >= 3) ? buildconditional(condition, truebranch, falsebranch)
         : buildconditional(condition, truebranch, id);
}

function buildconditional(condition, truebranch, falsebranch) {

    isfunction(truebranch) || (truebranch = always(truebranch));
    isfunction(falsebranch) || (falsebranch = always(falsebranch));

    return conditional.bind(THIS_NULL, condition, truebranch, falsebranch);
}

module.exports = curry(1, when);