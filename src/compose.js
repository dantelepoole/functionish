/**
 * @module compose
 */

'use strict';

const THIS_NULL = null;

const always = require('./always');
const id = require('./id');

const head = array => array[0];

const composermap = Object.freeze([
    always(id),
    head,
    ([f1,f2]) => (...args) => f1(f2(...args)),
    ([f1,f2,f3]) => (...args) => f1(f2(f3(...args))),
    ([f1,f2,f3,f4]) => (...args) => f1(f2(f3(f4(...args)))),
    ([f1,f2,f3,f4,f5]) => (...args) => f1(f2(f3(f4(f5(...args))))),
]);

const largecomposer = funcs => runcompose.bind(THIS_NULL, funcs);

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

    const composer = (composermap[funcs.length] ?? largecomposer);

    return composer(funcs);
}

function runcompose(funcs, ...args) {

    let result = funcs[funcs.length-1](...args);

    for(let i = funcs.length-2; i >= 0; i -= 1) result = funcs[i](result);

    return result;
}

module.exports = compose;