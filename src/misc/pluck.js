/**
 * @module misc/pluck
 */

'use strict';

const KEY_SEPARATOR_CHAR = '.';
const PROPERTY_NOT_FOUND = undefined;

const isobject = require('./isobject');
const isstring = require('./isstring');
const isundefined = require('./isundefined');
const notarray = require('./notarray');
const notobject = require('./notobject');

const propertyreducer = (source, key) => isobject(source) ? source[key] : PROPERTY_NOT_FOUND;

/**
 * Return the value of the property of *source* specified by *path*.
 * 
 * The *path* argument may be a compound path, i.e. a path that goes multiple levels deep. In that case, the
 * individual property keys should be separated by a `.`.
 * 
 * The *path* may be any type that can be used as a property key, e.g. a string, symbol or number. Therefore, you can
 * access individual array items when the pluck property is an array.
 *  
 * The *path* may also be an array of individual property keys. In this case, the array items may not be compound
 * paths.
 * 
 * If the path is invalid or if any intermediate property has a non-object value, `undefined` is returned. That means
 * that `pluck()` does not recurse down into the properties of, for example, a string or a function.
 * 
 * @example
 * 
 * const pluck = require('functionish/pluck');
 * 
 * const source = {
 *   firstname : 'Donald',
 *   lastname  : 'Duck',
 *   nephews  : [
 *      { firstname: 'Huey', lastname: 'Duck' },
 *      { firstname: 'Dewey', lastname: 'Duck' },
 *      { firstname: 'Louie', lastname: 'Duck' }
 *   ],
 *   creator : {
 *       name : 'Walt Disney',
 *       born : {
 *           year : 1901,
 *           city : 'Chicago'
 *       }
 *   }
 * }
 * 
 * pluck('firstname', source); // returns 'Donald'
 * pluck('creator.born.city', source); // returns 'Chicago'
 * pluck('nephews.length', source); // returns 3
 * pluck( ['nephews', 1, 'firstname' ], source); // returns 'Dewey'
 * pluck( 'wife', source ); // returns undefined
 * 
 * @func pluck
 * @param {string} path The path of the property to retrieve
 * @param {object} source The object to resolve *path* against
 * @returns {any}
 */
module.exports = function pluck(path, source) {

    return notobject(source) ? PROPERTY_NOT_FOUND
            : isstring(path) ? path.split(KEY_SEPARATOR_CHAR).reduce(propertyreducer, source)
            : isundefined(path) ? source
            : notarray(path) ? source[path]
            : (path.length == 1) ? source[ path[0] ]
            : path.reduce(propertyreducer, source);

}