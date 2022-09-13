/**
 * @module compose
 */

'use strict';

const ERR_BAD_FUNCTION = `ComposeError~The function at index %d has type %s. Expected a function.`;

const fail = require('./fail');
const head = require('./head');
const notfunction = require('./notfunction');
const typeorclass = require('./typeorclass');

const raisebadfunction = (index, func) => fail(ERR_BAD_FUNCTION, index, typeorclass(func));
const validatefunc = (index, func) => notfunction(func) && raisebadfunction(index, func);
const validatefuncs = funcs => { for(let i = 0; i < funcs.length; i += 1) validatefunc(i, funcs[i]) };

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
    
    validatefuncs(funcs);

    funcs.reverse();

    return function composedfunctions(...args) {

        let result = args;

        for(const func of funcs) result = [ func(...result) ];

        return head(result);
    }
}

