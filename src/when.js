/**
 * @module when
 */

'use strict';

const always = require('./always');
const callable = require('./callable');
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
function when(condition, truebranch, falsebranch=id) {

    isfunction(truebranch) || (truebranch = always(truebranch));
    isfunction(falsebranch) || (falsebranch = always(falsebranch));

    return isfunction(condition) ? when_dynamic(condition, truebranch, falsebranch)
         : condition ? truebranch
         : falsebranch;
}

function when_dynamic(condition, truebranch, falsebranch) {

    function _when(...args) {

        const branch = condition.call(this, ...args)
                     ? truebranch
                     : falsebranch;

        return branch.call(this, ...args);
    }

    _when.for = function _when_for(...conditionargs) {
        return condition.call(this, ...conditionargs) ? truebranch : falsebranch;
    }

    return _when;
    
}

module.exports = curry(1, when);