/**
 * @module choose
 */

'use strict';

/**
 * to do
 * 
 * @example <caption>Example usage of `choose()`</caption> 
 *     
 * to do
 * 
 * @function choose
 * @returns {function}
 */
function choose(truevalue, falsevalue) {
    
    return condition => condition
                      ? truevalue
                      : falsevalue;
}

module.exports = choose;