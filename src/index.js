/**
 * @module index
 */

function setglobal(...funcs) {

    for(const func of funcs) {

        (typeof func !== 'function')
         ||
        (global[func.name] === func)
         ||
        (global[func.name] === undefined && (global[func.name] = func))
         ||
        raiseglobalconflicterror(func.name);
    }
}

function raiseglobalconflicterror(funcname) {

    const errormessage = `functionish/setglobal(): global property key conflict for '${funcname}'.`;
    
    throw new TypeError(errormessage);
}

function globalize() {

    setglobal(
        module.exports.always,
        module.exports.applicable,
        module.exports.apply,
        module.exports.binary,
        module.exports.bind,
        module.exports.call,
        module.exports.callable,
        module.exports.compose,
        module.exports.curry,
        module.exports.curry1,
        module.exports.curry2,
        module.exports.curry3,
        module.exports.curry4,
        module.exports.debounce,
        module.exports.defaultto,
        module.exports.defer,
        module.exports.delay,
        module.exports.evaluate,
        module.exports.fallback,
        module.exports.False,
        module.exports.flip,
        module.exports.fork,
        module.exports.id,
        module.exports.juxtapose,
        module.exports.memoize,
        module.exports.noop,
        module.exports.nothrow,
        module.exports.nullary,
        module.exports.once,
        module.exports.partial,
        module.exports.pipe,
        module.exports.recurse,
        module.exports.recursive,
        module.exports.repeat,
        module.exports.select,
        module.exports.selectx,
        module.exports.trycatch,
        module.exports.tryfinally,
        module.exports.unary,
        module.exports.uniadic,
        module.exports.unless,
        module.exports.unlessx,
        module.exports.variadic,
        module.exports.when,
        module.exports.whenx,
        module.exports.witharity,
        module.exports.wrap,  
    )
}

module.exports.setglobal = setglobal;
module.exports.globalize = globalize;

module.exports.always = require('./always');
module.exports.applicable = require('./applicable');
module.exports.apply = require('./apply');
module.exports.binary = require('./binary');
module.exports.bind = require('./bind');
module.exports.call = require('./call');
module.exports.callable = require('./callable');
module.exports.compose = require('./compose');
module.exports.curry = require('./curry');
module.exports.curry1 = require('./curry1');
module.exports.curry2 = require('./curry2');
module.exports.curry3 = require('./curry3');
module.exports.curry4 = require('./curry4');
module.exports.debounce = require('./debounce');
module.exports.defaultto = require('./defaulto');
module.exports.defer = require('./defer');
module.exports.delay = require('./delay');
module.exports.evaluate = require('./evaluate');
module.exports.fallback = require('./fallback');
module.exports.False = require('./False');
module.exports.flip = require('./flip');
module.exports.fork = require('./fork');
module.exports.id = require('./id');
module.exports.juxtapose = require('./juxtapose');
module.exports.memoize = require('./memoize');
module.exports.noop = require('./noop');
module.exports.nothrow = require('./nothrow');
module.exports.nullary = require('./nullary');
module.exports.once = require('./once');
module.exports.partial = require('./partial');
module.exports.pipe = require('./pipe');
module.exports.recurse = require('./recurse');
module.exports.recursive = require('./recursive');
module.exports.repeat = require('./repeat');
module.exports.select = require('./select');
module.exports.selectx = require('./selectx');
module.exports.trycatch = require('./trycatch');
module.exports.tryfinally = require('./tryfinally');
module.exports.unary = require('./unary');
module.exports.uniadic = require('./uniadic');
module.exports.unless = require('./unless');
module.exports.unlessx = require('./unlessx');
module.exports.variadic = require('./variadic');
module.exports.when = require('./when');
module.exports.whenx = require('./whenx');
module.exports.witharity = require('./witharity');
module.exports.wrap = require('./wrap');
