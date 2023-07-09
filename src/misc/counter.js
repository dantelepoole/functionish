/**
 * @module misc/counter
 */

'use strict';

/**
 * to do
 * 
 * @example <caption>Example usage of `counter()`</caption>
 *
 * to do 
 * 
 * @function counter
 * @returns {function}
 */
function counter(value=0) {
    
    const _counter = () => value++;

    _counter.peek = () => value;

    return _counter;
}

module.exports = counter;