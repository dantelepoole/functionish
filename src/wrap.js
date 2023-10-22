/**
 * @module wrap
 */

'use strict';

const THIS_NULL = null;

const curry = require('./curry');
const isfunction = require('./types/isfunction');


const wrapreducer = (next, wrapper) => wrapper.bind(THIS_NULL, next);

/**
 * to do
 * 
 * @example <caption>Example usage of `wrap()`</caption>
 *     
 * to do
 * 
 * @function wrap
 * @param {function} wrapper The function or array of functions to wrap *targetfunc* with
 * @param {function} targetfunc The function to wrap
 * @returns {function}
 */
function wrap(wrapper, targetfunc) {

    return isfunction(wrapper)
         ? wrapper.bind(THIS_NULL, targetfunc)
         : wrapper.reduceRight(wrapreducer, targetfunc);

}

module.exports = curry(1, wrap);
