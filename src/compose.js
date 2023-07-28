/**
 * @module compose
 */

'use strict';

const THIS_NULL = null;

const id = require('./id');

/**
 * Compose is similar to {@link module:pipe pipe()} except that it invokes *funcs* in reverse order, i.e.
 * from right to left. See {@link module:pipe pipe()} for further details.
 * 
 * If the *funcs* array is empty, the returned function simply returns its first argument.
 * 
 * @example <caption>Example usage of `compose()`</caption>
 * 
 * const { compose } = require('functionish');
 * 
 * const increment = x => (x+1);
 * const double = x => (x*2);
 * const negate = x => -x;
 * 
 * const calculate = compose(negate, double, increment);
 * 
 * calculate(42); // returns `-86`
 * 
 * @function compose
 * @see {@link module:pipe pipe()}
 * @param  {...function} funcs One or more functions to compose
 * @returns {function}
 */
function compose(...funcs) {

    const firstfunc = funcs.pop() ?? id;

    return function _compose(...args) {

        let result = firstfunc.call(this, ...args);
    
        for(let i = funcs.length - 1; i >= 0; i -= 1) result = funcs[i].call(this, ...args);
    
        return result;
    }
}

module.exports = compose;