/**
 * @module decoratefunctionprototype
 */

'use strict';

const ERROR_BAD_BINDING = `decoratefunctionprototype(): Expected '%s()' to be called as a method on a function-instance. Received a %s instead.`;
const ERROR_INVALID_CURRY = `decoratefunctionprototype(): Cannot curry '%s' because it is already curried with a smaller arity.`;
const FUNCTION_PROTOTYPE_DECORATE = Symbol.for('functionish/#functionprototypedecorate');
const THIS_NONE = undefined;
const TYPE_FUNCTION = 'function';

const PROPERTY_DESCRIPTOR_CATCH = Object.freeze({ get:_catch_ });
const PROPERTY_DESCRIPTOR_BINARY = Object.freeze({ get:_binary_ });
const PROPERTY_DESCRIPTOR_CURRY = Object.freeze({ value:_curry_ });
const PROPERTY_DESCRIPTOR_DEFER = Object.freeze({ value:_defer_ });
const PROPERTY_DESCRIPTOR_DELAY = Object.freeze({ value:_delay_ });
const PROPERTY_DESCRIPTOR_FILTER = Object.freeze({ get:_filter_ });
const PROPERTY_DESCRIPTOR_FLIP = Object.freeze({ get:_flip_ });
const PROPERTY_DESCRIPTOR_INVOKE = Object.freeze({ get:_invoke_ });
const PROPERTY_DESCRIPTOR_ITERATE = Object.freeze({ get:_iterate_ });
const PROPERTY_DESCRIPTOR_MAP = Object.freeze({ get:_map_ });
const PROPERTY_DESCRIPTOR_MEMOIZE = Object.freeze({ value:_memoize_ });
const PROPERTY_DESCRIPTOR_NOT = Object.freeze({ get:_not_ });
const PROPERTY_DESCRIPTOR_NULLARY = Object.freeze({ get:_nullary_ });
const PROPERTY_DESCRIPTOR_ONCE = Object.freeze({ get:_once_ });
const PROPERTY_DESCRIPTOR_PARTIAL = Object.freeze({ value:_partial_ });
const PROPERTY_DESCRIPTOR_PIPE = Object.freeze({ value:_pipe_ });
const PROPERTY_DESCRIPTOR_SETDEFAULT = Object.freeze({ value:_setdefault_ });
const PROPERTY_DESCRIPTOR_TAP = Object.freeze({ get:_tap_ });
const PROPERTY_DESCRIPTOR_UNARY = Object.freeze({ get:_unary_ });
const PROPERTY_DESCRIPTOR_UNIADIC = Object.freeze({ value:_uniadic_ });
const PROPERTY_DESCRIPTOR_UNLESS = Object.freeze({ value:_unless_ });
const PROPERTY_DESCRIPTOR_VARIADIC = Object.freeze({ value:_variadic_ });
const PROPERTY_DESCRIPTOR_WHEN = Object.freeze({ value:_when_ });
const PROPERTY_DESCRIPTOR_WRAP = Object.freeze({ value:_wrap_ });

const attempt = require('./attempt');
const binary = require('./binary');
const curry = require('./curry');
const delay = require('./delay');
const defer = require('./defer');
const flip = require('./flip');
const format = require('util').format;
const invoke = require('./invoke');
const memoize = require('./memoize');
const nullary = require('./nullary');
const once = require('./once');
const partial = require('./partial');
const tap = require('./tap');
const unary = require('./unary');
const uniadic = require('./uniadic');
const unless = require('./unless');
const variadic = require('./variadic');
const wrap = require('./wrap');
const when = require('./when');
const withdefault = require('./withdefault');

const isfunction = value => (typeof value === TYPE_FUNCTION);
const pipereducer = (x, func) => func(x);
const type = value => (value === null) ? 'null' : typeof value;

/**
 * to do
 * 
 * @example <caption>Example usage of `decoratefunctionprototype()`</caption>
 * 
 * to do
 * 
 * @function decoratefunctionprototype
 */
function decoratefunctionprototype() {
    
    if(global[FUNCTION_PROTOTYPE_DECORATE] === FUNCTION_PROTOTYPE_DECORATE) return;

    global[FUNCTION_PROTOTYPE_DECORATE] = FUNCTION_PROTOTYPE_DECORATE;

    definefunctionprototypeproperties();
}

function definefunctionprototypeproperties() {

    Object.defineProperties(
        Function.prototype,
        {
            binary     : PROPERTY_DESCRIPTOR_BINARY,
            catch      : PROPERTY_DESCRIPTOR_CATCH,
            curry      : PROPERTY_DESCRIPTOR_CURRY,
            defer      : PROPERTY_DESCRIPTOR_DEFER,
            delay      : PROPERTY_DESCRIPTOR_DELAY,
            filter     : PROPERTY_DESCRIPTOR_FILTER,
            flip       : PROPERTY_DESCRIPTOR_FLIP,
            invoke     : PROPERTY_DESCRIPTOR_INVOKE,
            iterate    : PROPERTY_DESCRIPTOR_ITERATE,
            map        : PROPERTY_DESCRIPTOR_MAP,
            memoize    : PROPERTY_DESCRIPTOR_MEMOIZE,
            not        : PROPERTY_DESCRIPTOR_NOT,
            nullary    : PROPERTY_DESCRIPTOR_NULLARY,
            once       : PROPERTY_DESCRIPTOR_ONCE,
            partial    : PROPERTY_DESCRIPTOR_PARTIAL,
            pipe       : PROPERTY_DESCRIPTOR_PIPE,
            setdefault : PROPERTY_DESCRIPTOR_SETDEFAULT,
            tap        : PROPERTY_DESCRIPTOR_TAP,
            unary      : PROPERTY_DESCRIPTOR_UNARY,
            uniadic    : PROPERTY_DESCRIPTOR_UNIADIC,
            unless     : PROPERTY_DESCRIPTOR_UNLESS,
            variadic   : PROPERTY_DESCRIPTOR_VARIADIC,
            when       : PROPERTY_DESCRIPTOR_WHEN,
            wrap       : PROPERTY_DESCRIPTOR_WRAP
        }
    )
}

function _binary_() {

    return isfunction(this)
         ? binary(this)
         : failbadbinding('binary', this);
}

function _catch_(errorhandler) {

    return isfunction(this)
         ? attempt(errorhandler, this)
         : failbadbinding('catch', this);
}

function _curry_(arity) {

    isfunction(this) || failbadbinding('curry', this);

    arity = (arity ?? this.length);

    return ( ! this.arity || arity >= this.arity)
         ? curry(arity, this)
         : failinvalidcurry(this.name);
}

function _defer_(...partialargs) {

    return isfunction(this)
         ? defer(this, ...partialargs)
         : failbadbinding('defer', this);
}

function _delay_(delayms, ...args) {

    return isfunction(this)
         ? delay(delayms, this, ...args)
         : failbadbinding('delay', this);
}

function _filter_() {

    return isfunction(this)
         ? filter.bind(THIS_NONE, this)
         : failbadbinding('filter', this);
}

function _flip_() {

    return isfunction(this)
         ? flip(this)
         : failbadbinding('flip', this);
}

function _invoke_() {

    return isfunction(this)
         ? invoke.bind(THIS_NONE, this)
         : failbadbinding('iterate', this);
}

function _iterate_() {

    return isfunction(this)
         ? iterate.bind(THIS_NONE, this)
         : failbadbinding('iterate', this);
}

function _map_() {

    return isfunction(this)
         ? map.bind(THIS_NONE, this)
         : failbadbinding('map', this);
}

function _memoize_(cachefunc) {

    return isfunction(this)
         ? memoize(cachefunc, this)
         : failbadbinding('memoize', this);
}

function _not_() {

    return isfunction(this)
         ? (...args) => ! this(...args)
         : failbadbinding('not', this);
}

function _nullary_() {

    return isfunction(this)
         ? nullary(this)
         : failbadbinding('nullary', this);
}

function _once_() {

    return isfunction(this)
         ? once(this)
         : failbadbinding('once', this);
}

function _partial_(...partialargs) {

    return isfunction(this)
         ? partial(this, ...partialargs)
         : failbadbinding('partial', this);
}

function _pipe_(...funcs) {

    return isfunction(this)
         ? (...args) => funcs.reduce( pipereducer, this(...args) )
         : failbadbinding('pipe', this);
}

function _setdefault_(defaultvalue) {

    return isfunction(this)
         ? withdefault(defaultvalue, this)
         : failbadbinding('setdefault', this);
}

function _tap_() {

    return isfunction(this)
         ? tap(this)
         : failbadbinding('tap', this);
}

function _unary_() {

    return isfunction(this)
         ? unary(this)
         : failbadbinding('unary', this);
}

function _uniadic_(...partialargs) {

    return isfunction(this)
         ? uniadic(this, ...partialargs)
         : failbadbinding('uniadic', this);
}

function _unless_(condition, falsebranch) {

    return isfunction(this)
         ? unless(condition, this, falsebranch)
         : failbadbinding('unless', this);
}

function _variadic_(...partialargs) {

    return isfunction(this)
         ? variadic(this, ...partialargs)
         : failbadbinding('variadic', this);
}

function _wrap_(wrapperfunc) {

    return isfunction(this)
         ? wrap(wrapperfunc, this)
         : failbadbinding('wrap', this);

}

function _when_(condition, falsebranch) {

    return isfunction(this)
         ? when(condition, this, falsebranch)
         : failbadbinding('when', this);
}

function failbadbinding(funcname, targetfunc) {

    const errormessage = format( ERROR_BAD_BINDING, funcname, type(targetfunc) );
    throw new TypeError(errormessage);
}

function failinvalidcurry(funcname) {

    const errormessage = format(ERROR_INVALID_CURRY, funcname);
    throw new TypeError(errormessage);
}

function filter(filterfunc, list) {

    if( isfunction(list.filter) ) return list.filter( unary(filterfunc) );

    return {
        [Symbol.iterator]: function* () {
            for(const value of list) if( filterfunc(value) ) yield value;
        }
    }
}

function iterate(iteratefunc, list) {

    if( isfunction(list.forEach) ) list.forEach( unary(iteratefunc) );
    else for(const value of list) iteratefunc(value);

    return list;
}

function map(mapfunc, list) {

    if( isfunction(list.map) ) return list.map( unary(mapfunc) );

    return {
        [Symbol.iterator]: function* () {
            for(const value of list) yield mapfunc(value);
        }
    }
}

decoratefunctionprototype();