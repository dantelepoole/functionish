/**
 * @module recurse
 */

'use strict';

const RECURSE_SYMBOL = Symbol.for(`functionish/recurse#RECURSE_SYMBOL`);

module.exports = function recurse(...args) {

    return {
        args,
        recurse: RECURSE_SYMBOL
    }
}