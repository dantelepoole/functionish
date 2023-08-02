/**
 * @module misc/counter
 */

'use strict';

const isinteger = Number.isSafeInteger;
const isnumber = require('../types/isnumber');

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
function counter(initialvalue=0) {
    
    validateinitialvalue(initialvalue);

    let countervalue = initialvalue;

    const _counter = () => countervalue++;

    _counter.peek = () => countervalue;

    return _counter;
}

function validateinitialvalue(initialvalue) {

    if( isinteger(initialvalue) ) return initialvalue;

    const valuefault = isnumber(initialvalue)
                     ? `is ${initialvalue}`
                     : `has type ${typeof initialvalue}`;

    const errormessage = `counter(): The initialvalue ${valuefault}. Expected an integer number.`;

    return new TypeError(errormessage);
}

module.exports = counter;