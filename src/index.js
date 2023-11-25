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
    setglobal(...functionish);
}

const functionish = {
    always : require('./always'),
    applicable : require('./applicable'),
    apply : require('./apply'),
    binary : require('./binary'),
    bind : require('./bind'),
    call : require('./call'),
    callable : require('./callable'),
    compose : require('./compose'),
    cstyle : require('./cstyle'),
    curry : require('./curry'),
    curry1 : require('./curry1'),
    curry2 : require('./curry2'),
    curry3 : require('./curry3'),
    curry4 : require('./curry4'),
    debounce : require('./debounce'),
    defaultto : require('./defaulto'),
    defer : require('./defer'),
    delay : require('./delay'),
    evaluate : require('./evaluate'),
    fallback : require('./fallback'),
    False : require('./False'),
    flip : require('./flip'),
    fork : require('./fork'),
    id : require('./id'),
    juxtapose : require('./juxtapose'),
    memoize : require('./memoize'),
    noop : require('./noop'),
    nothrow : require('./nothrow'),
    nullary : require('./nullary'),
    once : require('./once'),
    partial : require('./partial'),
    pipe : require('./pipe'),
    recursive : require('./recursive'),
    repeat : require('./repeat'),
    select : require('./select'),
    selectx : require('./selectx'),
    trycatch : require('./trycatch'),
    tryfinally : require('./tryfinally'),
    unary : require('./unary'),
    uniadic : require('./uniadic'),
    unless : require('./unless'),
    unlessx : require('./unlessx'),
    variadic : require('./variadic'),
    when : require('./when'),
    whenx : require('./whenx'),
    witharity : require('./witharity'),
    wrap : require('./wrap')
}

module.exports = {setglobal, globalize, ...functionish}