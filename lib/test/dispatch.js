/**
 * @module lib/test/dispath
 * @ignore
 */

const dispatchable = require('./dispatchable');

const isfunction = func => (typeof func === 'function');
const notfunction = func => (typeof func !== 'function');

class Runnable {

    function;
    args = [];
    thisvalue=null;

    constructor(func, args) {
        this.function = func;
        this.args.push(...args);
    }

    run(thisvalue=this.thisvalue) {
        
        const result = this.function.call(thisvalue, ...this.args);

        isfunction(result) && dispatchable(result);

        return result;
    }
}

function dispatch(targetfunc, ...args) {

    if( notfunction(targetfunc) ) throw new TypeError(`Cannot dispatch the target function because it has type ${typeof targetfunc}. Expected a function.`);

    return new Runnable(targetfunc, args);
}

dispatch.Runnable = Runnable;

module.exports = dispatch;