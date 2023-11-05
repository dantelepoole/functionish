/**
 * @module lists/iterate
 */

'use strict';

const RESULT_NONE = Symbol.for('functionish/lists/iterate/NOT_ABORTED');

const curry = require('../curry');

/**
 * to do
 * 
 * @example <caption>Example usage of `iterate()`</caption>
 *     
 * to do
 *     
 * @function iterate
 * @param {function} func The function to apply to each item in *list*
 * @param {iterable} sourcelist An iterable object
 * @returns {iterable} 
 */
function iterate(func, sourcelist) {

    let result = sourcelist;
    const abort = data => (result = data);

    for(const item of sourcelist) {
        
        func(item, abort);

        if(result !== sourcelist) break;
    }

    return result;
}

module.exports = curry(1, iterate);