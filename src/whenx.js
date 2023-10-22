/**
 * @module whenx
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
 * @example <caption>Example usage of `whenx()`</caption> 
 *     
 * to do
 * 
 * @function whenx
 * @returns {function}
 */
function whenx(condition, truebranch, falsebranch) {

    return notfunction(condition) ? condition ? truebranch : falsebranch
         : (arguments.length < 3) ? buildconditional(condition, truebranch, id)
         : buildconditional(condition, truebranch, falsebranch);
}

function buildconditional(condition, truebranch, falsebranch) {

    isfunction(truebranch) || (truebranch = always(truebranch));
    isfunction(falsebranch) || (falsebranch = always(falsebranch));

    const _whenx = (conditionarg, ...branchargs) => condition(conditionarg)
                                                  ? truebranch(...branchargs)
                                                  : falsebranch(...branchargs);

    _whenx.for = (...conditionargs) => condition(...conditionargs)
                                     ? truebranch
                                     : falsebranch;

    return _whenx;
}

module.exports = curry(1, whenx);