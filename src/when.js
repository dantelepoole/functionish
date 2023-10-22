/**
 * @module when
 */

'use strict';

const always = require('./always');
const curry = require('./curry');
const id = require('./id');
const isfunction = require('./types/isfunction');
const not = require('./logic/not');

const notfunction = not(isfunction);

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
         : (arguments.length < 3) ? buildconditional(condition, truebranch, id)
         : buildconditional(condition, truebranch, falsebranch);
}

function buildconditional(condition, truebranch, falsebranch) {

    isfunction(truebranch) || (truebranch = always(truebranch));
    isfunction(falsebranch) || (falsebranch = always(falsebranch));

    return (...args) => condition(...args)
                      ? truebranch(...args)
                      : falsebranch(...args);

}

module.exports = curry(1, when);