/**
 * @module dispatchable
 * @ignore
 */

const ERR_FUNCTION_PROTOTYPE_DEFINED = `The Function.prototype.dispatch() method has already been defined.`;

const dispatch_function = require('./dispatch');

function dispatch(...args) {
    return dispatch_function(this, ...args);
}

function dispatchable(func) {

    if( func.dispatch === undefined ) func.dispatch = dispatch;
    else if( func.dispatch !== dispatch ) throw new Error(ERR_FUNCTION_PROTOTYPE_DEFINED);

    return func;
}

module.exports = dispatchable;