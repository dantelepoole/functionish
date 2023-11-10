/**
 * @module objects/pluck
 */

'use strict';

const INDEX_NOT_FOUND = -1;
const SEPARATOR_CHAR = '.';
const SOURCE_VOID = {};

const isarray = require('../types/isarray');
const isstring = require('../types/isstring');
const tagcurryarity = require('../../lib/tagcurryarity');

const pluckkey = key => source => source[key];
const pluckreducer = (source, key) => (source ?? SOURCE_VOID)[key];
const pluckpath = path => path.reduce.bind(path, pluckreducer);

const parsepath = path => path.split(SEPARATOR_CHAR);

const iscomposite = path => (path.indexOf(SEPARATOR_CHAR) !== INDEX_NOT_FOUND);
const buildstringpluck = path => iscomposite(path)
                               ? pluckpath( parsepath(path) )
                               : pluckkey(path);

/**
 * to do
 *  
 * @example <caption>Example usage of `pluck()`</caption>
 * 
 * const { pluck } = require('functionish/misc');
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
 * pluck('creator', source);   // returns the `creator` object
 * pluck('nephews', source);   // returns the `nephews` array
 * 
 * @function pluck
 * @see {@link module:misc/pluckx pluckx()}
 * @param {(string|number|symbol)} path The key of the property to retrieve
 * @param {object} source The object pluck the property from
 * @returns {any}
 */
function pluck(path, source) {

    const plucker = isstring(path) ? buildstringpluck(path)
                  : isarray(path) ? pluckpath(path)
                  : pluckkey(path);

    return (arguments.length < 2)
         ? plucker
         : plucker(source);
}

tagcurryarity(pluck, 1);

module.exports = pluck;