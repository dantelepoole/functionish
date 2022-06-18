/**
 * @module compose
 */

'use strict';

const idfunctioncomposition = function functioncomposition(x) { return x }

/**
 * Compose is implemented in terms of {@link module:pipe pipe()} except that it invokes *funcs* in reverse order, i.e.
 * from right to left. See {@link module:pipe pipe()} for further details.
 * 
 * @example
 * 
 * const compose = require('functionish/compose');
 * 
 * const increment = x => (x+1);
 * const double = x => (x*2);
 * const negate = x => -x;
 * 
 * const allthree = compose(negate, double, increment);
 * 
 * allthree(42); // returns `-86`
 * 
 * @func compose
 * @see {@link module:pipe pipe()}
 * @param  {...function} funcs One or more functions to compose to a single function
 * @returns {function}
 */

module.exports = function compose(...funcs) {
    
    if( funcs.length === 0 ) return idfunctioncomposition

    return function functioncomposition(...args) {

        let index = funcs.length - 1;
        let result = funcs[index](...args);
        
        index -= 1;

        while(index >= 0) {
            result = funcs[index](result);
            index -= 1;
        }

        return result;
    }
}