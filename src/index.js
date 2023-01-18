/**
 * @module index
 */

const validateglobal = func => global[func] === undefined ? true
                             : global[func] === func ? false
                             : failglobalduplicationerror(func);
                             
function loadglobal(funcs) {
    for(const func of funcs) if( validateglobal(func) ) global[func] = func;
}

function failglobalduplicationerror(func) {

    const errormessage = `loadglobal(): duplicate global property with the key '${func?.name}'.`;
    
    const error = new Error(errormessage);
    error.name = 'FunctionishError';

    throw error;
}

const functionish = {

    loadglobal,

    AbortController : require('./AbortController'),
    AbortSignal     : require('./AbortSignal'),
    always          : require('./always'),
    applicable      : require('./applicable'),
    apply           : require('./apply'),
    binary          : require('./binary'),
    bind            : require('./bind'),
    call            : require('./call'),
    callable        : require('./callable'),
    compose         : require('./compose'),
    curry           : require('./curry'),
    curry2          : require('./curry2'),
    curry3          : require('./curry3'),
    curry4          : require('./curry4'),
    defer           : require('./defer'),
    evaluate        : require('./evaluate'),
    fallback        : require('./fallback'),
    Flag            : require('./Flag'),
    flip            : require('./flip'),
    id              : require('./id'),
    invocable       : require('./invocable'),
    invoke          : require('./invoke'),
    juxtapose       : require('./juxtapose'),
    memoize         : require('./memoize'),
    noop            : require('./noop'),
    nullary         : require('./nullary'),
    once            : require('./once'),
    partial         : require('./partial'),
    pipe            : require('./pipe'),
    recursive       : require('./recursive'),
    rename          : require('./rename'),
    repeat          : require('./repeat'),
    select          : require('./select'),
    tap             : require('./tap'),
    timeout         : require('./timeout'),
    unary           : require('./unary'),
    uniadic         : require('./uniadic'),
    unless          : require('./unless'),
    unlessx         : require('./unlessx'),
    variadic        : require('./variadic'),
    when            : require('./when'),
    whenx           : require('./whenx'),
    witharity       : require('./witharity'),
    withdefault     : require('./withdefault'),
    wrap            : require('./wrap')
}

loadglobal([
    functionish.always,
    functionish.compose,
    functionish.curry,
    functionish.curry2,
    functionish.curry3,
    functionish.curry4,
    functionish.flip,
    functionish.id,
    functionish.memoize,
    functionish.noop,
    functionish.once,
    functionish.partial,
    functionish.pipe,
    functionish.tap,
    functionish.when,
    functionish.whenx,
    functionish.wrap
])

module.exports = functionish;