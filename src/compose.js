/**
 * @module compose
 */

'use strict';

const ERR_MISSING_FUNCTIONS = `functionish/compose(): The targetfuncs argument array is empty. Expected at least one function.`;

const head = array => array[0];

const largecomposer = funcs => runcompose.bind(null, funcs);
const raisemissingfunctionserror = () => { throw new TypeError(ERR_MISSING_FUNCTIONS); }

const composermap = Object.freeze([
    raisemissingfunctionserror,
    head,
    ([f1,f2]) => (...args) => f1(f2(...args)),
    ([f1,f2,f3]) => (...args) => f1(f2(f3(...args))),
    ([f1,f2,f3,f4]) => (...args) => f1(f2(f3(f4(...args)))),
    ([f1,f2,f3,f4,f5]) => (...args) => f1(f2(f3(f4(f5(...args))))),
]);

/**
 * Return a function that runs each function in the *targetfuncs* array in reverse order (i.e. from last
 * to first) passing the previous function's return value to the following function each time.
 * 
 * If the *targetfuncs* array is empty an error is thrown.
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
 * @param  {...function} targetfuncs One or more functions to compose
 * @returns {function}
 */
function compose(...targetfuncs) {

    const composer = (composermap[targetfuncs.length] ?? largecomposer);

    return composer(targetfuncs);
}

function runcompose(targetfuncs, ...args) {

    let result = targetfuncs[targetfuncs.length-1](...args);

    for(let i = (targetfuncs.length-2); i >= 0; i -= 1) result = targetfuncs[i](result);

    return result;
}

module.exports = compose;