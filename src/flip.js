/**
 * @module flip
 */

'use strict';

const curry = require('./curry');
const curryarity = require('./curryarity');
const iscurried = require('./misc/iscurried');

const matchcurry = (source, target) => curry( curryarity(source), target );

/**
 * to do
 * 
 * @example <caption>Example usage of `flip()`</caption>
 * 
 * [to do]
 * 
 * @function flip
 * @param {function} targetfunc The function to flip the arguments of
 * @returns {function}
 */
function flip(targetfunc) {

    const flippedfunc = (a, b, ...args) => targetfunc(b, a, ...args);

    return iscurried(targetfunc) && matchcurry(targetfunc, flippedfunc) || flippedfunc;
}

module.exports = flip;