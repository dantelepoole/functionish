/**
 * @module index
 */

'use strict';

/**
 * The functionish package consists of 150+ functions, each in their own module, of which you will usually only
 * need a handful in your own modules. So it would be very ineffecient to have each functionish module loaded
 * into memory. At the same time, it can be annoying to have to write a separate `require()` statement for each
 * module you wish to use.
 * 
 * The main functionish module seeks to alleviate this annoyance by exporting an object that offers only a single
 * `load()` method when first required. The `load()` method accepts one or more module names (function names) to
 * load and return, and simultaneously stores them as methods of the functionish module itself. This allows you to
 * load only the modules you need and to load them in a single statement (well, two statements, actually).
 * 
 * @example
 * 
 * const f = require('functionish');
 * const {curry, partial, map, reduce} = f.load('curry', 'partial', 'map', 'reduce');
 * 
 * // the specified modules are now loaded into their respective variables and as
 * // methods on the f-object
 * 
 * curry === f.curry; // true
 * partial === f.partial; // true
 * map === f.map; // true
 * reduce === f.reduce; // true
 */
const functionish = {

    /**
     * The functionish package consists of 150+ functions, each in their own module, of which you will usually only
     * need a handful in your own modules. So it would be very ineffecient to have each functionish module loaded
     * into memory. At the same time, it can be annoying to have to write a separate `require()` statement for each
     * module you wish to use.
     * 
     * The main functionish module seeks to alleviate this annoyance by exporting an object that offers only a single
     * `load()` method when first required. The `load()` method accepts one or more module names (function names) to
     * load and return, and simultaneously stores them as methods of the functionish module itself. This allows you to
     * load only the modules you need and to load them in a single statement (well, two statements, actually).
     * 
     * @example
     * 
     * const f = require('functionish');
     * const {curry, partial, map, reduce} = f.load('curry', 'partial', 'map', 'reduce');
     * 
     * // the specified modules are now loaded into their respective variables and as
     * methods on the f-object
     * 
     * curry === f.curry; // true
     * partial === f.partial; // true
     * map === f.map; // true
     * reduce === f.reduce; // true
     * 
     * @param  {...string} modules The names of one or  more modules to load
     * @returns {object} The functionish object with the specified modules loaded
     */
    load(...modules) {
        modules.forEach(modulename => loadmodule(functionish, modulename));
        return functionish;
    }
}

function loadmodule(functionish, modulename) {

    if(modulename !== 'load' && typeof functionish[modulename] === 'undefined') {
        functionish[modulename] = require(`./${modulename}`);
    }
}

module.exports = functionish;
