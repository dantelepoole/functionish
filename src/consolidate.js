/**
 * @module consolidate
 */

'use strict';

module.exports = function consolidate(...funcs) {
    
    return function (...args) {

        let result = args[0];

        for(const func of funcs) result = func(...args);

        return result;
    }
}