/**
 * @module whenx
 */

'use strict';

const always = require('./always');
const curry = require('./curry');
const id = require('./id');
const isfunction = require('./types/isfunction');


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

    return isfunction(condition) ? _whenx(...arguments)
         : condition ? truebranch
         : falsebranch;
}

function _whenx(condition, truebranch, falsebranch) {

    (arguments.length < 3) && (falsebranch = id);

    return buildwhenx(condition, truebranch, falsebranch);        
}

function buildwhenx(condition, truebranch, falsebranch) {

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