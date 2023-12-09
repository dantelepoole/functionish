/**
 * @module dispatchallthethings
 * @ignore
 */

const ERR_FUNCTION_PROTOTYPE_DEFINED = `The Function.prototype.dispatch() method has already been defined.`;

const dispatch_function = require('./dispatch');

function dispatch(...args) {
    return dispatch_function(this, ...args);
}

if( Function.prototype.dispatch === undefined ) Function.prototype.dispatch = dispatch;
else if( Function.prototype.dispatch !== dispatch ) throw new Error(ERR_FUNCTION_PROTOTYPE_DEFINED);