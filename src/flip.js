/**
 * @module flip
 */

'use strict';

const CurryArity = require('./curry').CurryArity;

const curry = require('./curry');
const curryarity = require('./curryarity');
const iscurriedfunction = require('./types/iscurriedfunction');

const copycurry = (source, target) => curry( curryarity(source), target );

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
    
    function flippedfunction(a, b, ...args) {
        return targetfunc.call(this, b, a, ...args);
    }
    
    iscurriedfunction(targetfunc) && copycurry(targetfunc, flippedfunction);

    return flippedfunction;
}

module.exports = flip;