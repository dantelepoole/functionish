/**
 * @module compose
 */

'use strict';

const ERR_BAD_FUNCTION = `ComposeError~The function at index %d has type %s. Expected a function.`;

const fail = require('./fail');
const notfunction = require('./notfunction');
const typeorclass = require('./typeorclass');

const raisebadfunction = (index, func) => fail(ERR_BAD_FUNCTION, index, typeorclass(func));

/**
 * Compose is similar to {@link module:pipe pipe()} except that it invokes *funcs* in reverse order, i.e.
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
    
    funcs.forEach( functionvalidatorfactory() );

    return function composedfunctions(...args) {

        for(let index = funcs.length-1; index >= 0; index -= 1) args = [ funcs[index](...args) ];

        return args[0];
    }
}

function functionvalidatorfactory() {

    let index = -1;

    return func => (index += 1, notfunction(func) && raisebadfunction(index, func)); 
}
