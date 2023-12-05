/**
 * @module math/runningaverage
 */

'use strict';

const sumreducer = (a,b) => (a+b);

/**
 * Return a function that tracks a running average of its argument numbers over multiple calls.
 * 
 * The return function accepts a variable number of numeric arguments and returns the average value of all arguments
 * received in all calls, up to and including the current.
 * 
 * The returned function has a `reset()` method that resets its internal state to `0`.
 * 
 * The returned function does not verify the argument types, so its behaviour is unpredictable if passed anything other
 * than number types.
 * 
 * @example <caption>Example usage of `runningaverage()`</caption>
 * 
 * const { runningaverage } = require('functionish/math');
 * 
 * const trackaverage = runningaverage();
 * 
 * trackaverage(1); // returns 1
 * trackaverage(2,3); // returns 2
 * trackaverage(4,5,6,7,8,9); // returns 5
 * 
 * trackaverage.reset();
 * 
 * trackaverage(); // returns 0
 * 
 * @function runningaverage
 * @returns {function}
 */
function runningaverage() {

    let count = 0;
    let total = 0;

    function _runningaverage(...numbers) {

        count += numbers.length;
        
        total += (numbers.length === 1)
               ? numbers[0]
               : numbers.reduce(sumreducer, 0);

        return (total/count) || 0;
    }

    _runningaverage.reset = () => (count = total = 0);

    return _runningaverage;
}

module.exports = runningaverage;