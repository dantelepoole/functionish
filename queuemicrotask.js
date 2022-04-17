/**
 * @module queuemicrotask
 */

'use strict';

module.exports = function queuemicrotask(func, ...args) {

    queueMicrotask(
        
        function microtask() {
            func(...args);
        }
    )
}