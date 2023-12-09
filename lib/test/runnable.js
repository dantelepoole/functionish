/**
 * @module runnable
 * @ignore
 */

const ERR_FUNCTION_PROTOTYPE_DEFINED = `The Function.prototype.run() method has already been defined.`;

const { invoke } = require('./invoke');

function run(...args) {
    return invoke(this, ...args);
}

if( Function.prototype.run === undefined ) Function.prototype.run = run;
else if( Function.prototype.run !== run ) throw new Error(ERR_FUNCTION_PROTOTYPE_DEFINED);