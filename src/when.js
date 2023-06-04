/**
 * @module when
 */

'use strict';

const always = require('./always');
const curry = require('./curry');
const evaluate = require('./evaluate');
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

    isfunction(condition) || (condition = always(condition));
    
    const selectconditionalbranch = (...args) => condition(...args)
                                               ? truebranch
                                               : falsebranch;

    const _when = (...args) => evaluate( selectconditionalbranch(...args), ...args );
    _when.for = selectconditionalbranch;
    
    return _when;
}

module.exports = curry(1, when);