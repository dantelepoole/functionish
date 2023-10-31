/**
 * @module unlessx
 */

'use strict';

const always = require('./always');
const curry = require('./curry');
const id = require('./id');
const isfunction = require('./types/isfunction');
const not = require('./logic/not');

const havefalsebranch = args => (args.length >= 3);
const notfunction = not(isfunction);

/**
 * to do
 * 
 * @example <caption>Example usage of `unlessx()`</caption> 
 *     
 * to do
 * 
 * @function unlessx
 * @returns {function}
 */
function unlessx(condition, falsebranch, truebranch) {

    return notfunction(condition) ? condition ? truebranch : falsebranch
         : havefalsebranch(arguments) ? buildconditional(condition, truebranch, falsebranch)
         : buildconditional(condition, truebranch, id);
}

function buildconditional(condition, falsebranch, truebranch) {

    isfunction(truebranch) || (truebranch = always(truebranch));
    isfunction(falsebranch) || (falsebranch = always(falsebranch));

    const _unless = (conditionarg, ...branchargs) => condition(conditionarg)
                                                   ? truebranch(...branchargs)
                                                   : falsebranch(...branchargs);

    _unless.for = (...conditionargs) => condition(...conditionargs)
                                      ? truebranch
                                      : falsebranch;

    return _unless;
}

module.exports = curry(1, unlessx);