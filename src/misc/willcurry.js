/**
 * @module misc/willcurry
 */

'use strict';

const { CurryArity } = require('../../lib/FSymbol');

/**
 * to do
 * 
 * @function willcurry
 * @param {function} targetfunc
 * @param {any[]} argcount
 * @returns {boolean}
 */
function willcurry(targetfunc, argcount) {
    return (targetfunc[CurryArity] >= argcount);
}

module.exports = willcurry;