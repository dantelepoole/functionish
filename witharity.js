/**
 * @module lib/witharity
 * @ignore
 */

'use strict';

const ERR_BAD_ARITY = `WithArityError~The arity %s. Expected a positive integer.`;
const ERR_BAD_FUNCTION = `WithArityError~The function has type %s. Expected a function.`;

const curry2 = require('./curry2');
const fail = require('./fail');
const notinteger = require('./notinteger');
const notnumber = require('./notnumber');
const typeorclass = require('./typeorclass');

module.exports = curry2(

    function witharity(arity, func) {

        if( notnumber(arity) ) fail(ERR_BAD_ARITY, `has type ${ typeorclass(arity) }`);
        if( notinteger(arity) || arity < 0 ) fail(ERR_BAD_ARITY, `is ${arity}`);
        if(typeof func !== 'function') fail(ERR_BAD_FUNCTION, typeorclass(func));

        const witharityname = `arity[${arity}] ${func.name}`;

        return (arity === 0) ? setnullary(func, witharityname)
             : (arity === 1) ? setunary(func, witharityname)
             : (arity === 2) ? setbinary(func, witharityname)
             : (arity === 3) ? setternary(func, witharityname)
             : (arity === 4) ? setquaternary(func, witharityname)
             : setarity(arity, func, witharityname);

    }
)

function setnullary(func, funcname) {

    return {
        [funcname]() {
            return func.call(this);
        }
    }[funcname]
}

function setunary(func, funcname) {

    return {
        [funcname](a) {
            return func.call(this, a);
        }
    }[funcname]
}

function setbinary(func, funcname) {

    return {
        [funcname](a,b) {
            return func.call(this, a, b);
        }
    }[funcname]
}

function setternary(func, funcname) {

    return {
        [funcname](a,b,c) {
            return func.call(this, a, b, c);
        }
    }[funcname]
}

function setquaternary(func, funcname) {

    return {
        [funcname](a,b,c,d) {
            return func.call(this, a, b, c, d);
        }
    }[funcname]
}

function setarity(arity, func, funcname) {

    return {
        [funcname](...args) {
            args.length = arity;
            return func.call(this, ...args);
        }
    }[funcname]
}
