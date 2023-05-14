/**
 * @module recurse
 */

'use strict';

function recurse(func, ...args) {

    const context = {
        [func.name] : (...recurseargs) => (args = recurseargs)
    }

    let result = func.call(context, ...args);

    while(result === args) result = func.call(context, ...args);

    return result;
}

module.exports = recurse;