/**
 * @module whenx
 */

'use strict';

const curry = require('./curry');
const id = require('./id');

const conditional = (condition, truebranch, falsebranch, conditionarg, ...branchargs) => condition(conditionarg)
                                                                                       ? truebranch(...branchargs)
                                                                                       : falsebranch(...branchargs);

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

    return (arguments.length > 2)
         ? buildconditional(condition, truebranch, falsebranch)
         : buildconditional(condition, truebranch, id);
}

function buildconditional(condition, truebranch, falsebranch) {

    isfunction(truebranch) || (truebranch = always(truebranch));
    isfunction(falsebranch) || (falsebranch = always(falsebranch));

    const runconditional = conditional.bind(THIS_NULL, condition, truebranch, falsebranch);

    runconditional.for = (...args) => condition(...args) ? truebranch : falsebranch;

    return runconditional;
}

module.exports = curry(1, whenx);