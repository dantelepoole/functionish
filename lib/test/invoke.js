/**
 * @module lib/test/invoke
 * @ignore
 */

class Invocation {

    function;
    args = [];
    thisvalue=null;

    constructor(func, args) {
        this.function = func;
        this.args.push(...args);
    }

    invoke(thisvalue=this.thisvalue) {
        return this.function.call(thisvalue, ...this.args)
    }
}

module.exports.invoke = function invoke(targetfunc, ...args) {

    if(typeof targetfunc !== 'function') throw new TypeError(`Cannot invoke the target function because it has type ${typeof targetfunc}. Expected a function.`);

    return new Invocation(targetfunc, args);
}

module.exports.evaluate = function evaluate(source) {

    return (source instanceof Invocation)
         ? source.invoke()
         : source;
}