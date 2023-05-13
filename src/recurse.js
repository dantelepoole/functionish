/**
 * @module recurse
 */

'use strict';

function recurse(func, ...args) {

    func = func.bind({
        [func.name] : (...recurseargs) => (args = recurseargs)
    })

    let result = func(...args);

    while(result === args) result = func(...args);

    return result;
}

module.exports = recurse;