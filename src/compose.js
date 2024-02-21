/**
 * @module compose
 */

'use strict';

const FUNCTIONLESS_COMPOSER = () => x => x;

const composermap = Object.freeze([
    FUNCTIONLESS_COMPOSER,
    ([f1]) => f1,
    ([f1,f2]) => (...args) => f1(f2(...args)),
    ([f1,f2,f3]) => (...args) => f1(f2(f3(...args))),
    ([f1,f2,f3,f4]) => (...args) => f1(f2(f3(f4(...args)))),
    ([f1,f2,f3,f4,f5]) => (...args) => f1(f2(f3(f4(f5(...args))))),
    ([f1,f2,f3,f4,f5,f6]) => (...args) => f1(f2(f3(f4(f5(f6(...args)))))),
    ([f1,f2,f3,f4,f5,f6,f7]) => (...args) => f1(f2(f3(f4(f5(f6(f7(...args))))))),
    ([f1,f2,f3,f4,f5,f6,f7,f8]) => (...args) => f1(f2(f3(f4(f5(f6(f7(f8(...args)))))))),
    ([f1,f2,f3,f4,f5,f6,f7,f8,f9]) => (...args) => f1(f2(f3(f4(f5(f6(f7(f8(f9(...args))))))))),
    ([f1,f2,f3,f4,f5,f6,f7,f8,f9,f10]) => (...args) => f1(f2(f3(f4(f5(f6(f7(f8(f9(f10(...args)))))))))),
]);

const largecomposer = funcs => largecompose.bind(null, funcs.pop(), funcs);
const getcomposer = functioncount => (composermap[functioncount] ?? largecomposer);

/**
 * Return a function that runs each function in the *targetfuncs* array in reverse order (i.e. from last
 * to first) passing the previous function's return value to the following function each time.
 * 
 * If the *targetfuncs* array is empty the returned function simply returns its first argument or `undefined`
 * if no arguments are passed.
 * 
 * `compose()` does not check its argument types, so if any *targetfunc* is not a function, it will only
 * throw when the returned function is called. 
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
    
    const composer = getcomposer(targetfuncs.length);

    return composer(targetfuncs);
}

function largecompose(firstfunc, funcs, ...args) {

    let result = firstfunc(...args);

    for(let i = funcs.length-1; i >= 0; i -= 1) result = funcs[i](result);

    return result;
}

module.exports = compose;