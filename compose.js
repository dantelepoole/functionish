/**
 * @module compose
 */

'use strict';

const id = function composition(x) { return x }

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
    
    if( funcs.length === 0 ) return id;

    funcs.reverse();

    return function composition(...args) {

        let result = funcs[0](...args);
        
        for( let index = 1; index < funcs.length; index += 1 ) result = funcs[index](result);

        return result;

    }
}