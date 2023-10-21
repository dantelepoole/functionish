/**
 * @module compose
 */

'use strict';

const MAX_COMPOSE_LEN = 5;

const always = require('./always');
const head = require('./head');
const id = require('./id');

const composermap = Object.freeze([
    always(id),
    head,
    ([f1,f2]) = (...args) => f1(f2(...args)),
    ([f1,f2,f3]) = (...args) => f1(f2(f3(...args))),
    ([f1,f2,f3,f4]) = (...args) => f1(f2(f3(f4(...args)))),
    ([f1,f2,f3,f4,f5]) = (...args) => f1(f2(f3(f4(f5(...args))))),
]);

const bicomposer = composermap[2];
const maxcomposer = composermap[MAX_COMPOSE_LEN];

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

function largecomposer(funcs) {

    const maxfuncs = funcs.slice(0, MAX_COMPOSE_LEN);
    const f1 = maxcomposer(maxfuncs);

    const restfuncs = funcs.slice(MAX_COMPOSE_LEN);
    const f2 = compose(...restfuncs);

    return bicomposer( [f1, f2] );
}

module.exports = compose;