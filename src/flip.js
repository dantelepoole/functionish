/**
 * @module flip
 */

'use strict';

const curry = require('./curry');
const curryarity = require('./curryarity');
const iscurried = require('./types/iscurried');

/**
 * to do
 * 
 * @example <caption>Example usage of `flip()`</caption>
 * 
 * [to do]
 * 
 * @function flip
 * @param {function} targetfunc The function to flip the arguments for
 * @returns {function}
 */
function flip(targetfunc) {
    
    const flippedfunction = (a, b, ...args) => targetfunc(b, a, ...args);
    
    return iscurried(targetfunc)
         ? curry( curryarity(targetfunc), flippedfunction )
         : flippedfunction;
}

module.exports = flip;