/**
 * @module when
 */

'use strict';

const always = require('./always');
const curry = require('./curry');
const evaluate = require('./evaluate');
const id = require('./id');
const isfunction = require('./types/isfunction');
const notfunction = require('./types/notfunction');

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

    return isfunction(condition) ? whenfactory(condition, truebranch, falsebranch)
         : condition ? truebranch
         : falsebranch;
}

function whenfactory(condition, truebranch, falsebranch) {

    function _when(...args) {

        const selectedbranch = condition.call(this, ...args) ? truebranch : falsebranch;

        return selectedbranch.call(this, ...args);
    }

    _when.for = whenforfactory(condition, truebranch, falsebranch);

    return _when;
}

function whenforfactory(condition, truebranch, falsebranch) {

    return function _whenfor(...conditionargs) {
        
        const conditionthis = this;

        return function _when(...branchargs) {

            const selectedbranch = condition.call(conditionthis, ...conditionargs) ? truebranch : falsebranch;

            return selectedbranch.call(this, ...branchargs);
        }
    }
}


module.exports = curry(1, when);