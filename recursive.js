/**
 * @module recursive
 */

'use strict';

const RECURSE_SYMBOL = Symbol.for(`functionish/recurse#RECURSE_SYMBOL`);

const resolvefunction = require('./resolvefunction');

const shouldrecurse = result => (result?.recurse === RECURSE_SYMBOL);

/**
 * Return a function that allows *func* to emulate tail recursion by calling
 * {@link module:recurse recurse()}. See {@link module:recurse recurse()} for
 * more information.
 * 
 * @func recursive
 * @see {@link module:recurse recurse()}
 * @param {function} func The function to make recursive
 * @returns {function}
 */
module.exports = function recursive(func) {

    func = resolvefunction(func);
    
    return function recursivefunction(...args) {

        let result = func.call(this, ...args);

        while( shouldrecurse(result) ) result = func.call(this, ...result.args);

        return result;
    }
}