/**
 * @module compose
 */

'use strict';

const THIS_NULL = null;

const id = require('./id');

const bicompose = (f,g) => (...args) => f( g(...args) );

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

    return (funcs.length > 2 && _compose.bind(THIS_NULL, funcs.pop(), funcs))
            ||
           (funcs.length === 2 && bicompose(funcs[0], funcs[1]))
            ||
           (funcs[0] ?? id);
}

function _compose(firstfunc, funcs, ...args) {

    let result = firstfunc(...args);

    for(let index = funcs.length - 1; index >= 0; index -= 1) result = funcs[index](result);

    return result;
}


module.exports = compose;