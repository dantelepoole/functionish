/**
 * @module recursive
 */

'use strict';

const RECURSE_SYMBOL = Symbol.for(`functionish/recurse#RECURSE_SYMBOL`);

const resolvefunction = require('./resolvefunction');

const shouldrecurse = result => (result?.recurse === RECURSE_SYMBOL);

module.exports = function recursive(func) {

    func = resolvefunction(func);
    
    return function recursivefunction(...args) {

        let result = func.call(this, ...args);

        while( shouldrecurse(result) ) result = func.call(this, ...result.args);

        return result;
    }
}