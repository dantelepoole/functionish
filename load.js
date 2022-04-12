/**
 * @module
 */

'use strict';

const isarray = require('./isarray');
const isundefined = require('./isundefined');
const not = require('./not');


const notobject = not( require('./isobject') );

module.exports = function load(target, ...keys) {

    if( keys.length === 1 && isarray(keys[0]) ) keys = keys[0];

    if( notobject(target) ) throw new TypeError(`load(): The target is null or not an object [${target}]`);

    const functions = keys.map( key => require(`${module.path}/${key}`));

    let index = 0;
    while( index < keys.length ) {

        const key = keys[index];
        const value = functions[index];

        if( isundefined(target[key]) ) target[key] = value;
        
        index += 1;
    }

    return target;
}