/**
 * @module papply
 */

'use strict';

module.exports = function papply(func, ...args) {

    try {
        
        const result = func(...args);
        return Promise.resolve(result);

    } catch (error) {
        return Promise.reject(error);
    }
}
