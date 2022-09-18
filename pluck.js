/**
 * @module pluck
 */

'use strict';

const INDEX_NOT_FOUND = -1;
const KEY_SEPARATOR_CHAR = '.';
const TARGET_UNDEFINED = undefined;

const isempty = require('./isempty');
const isequal = require('./isequal');
const notobject = require('./notobject');
const notstring = require('./notstring');

const notfound = isequal(INDEX_NOT_FOUND);

/**
 * Return the value of the property of *source* identified by *path*. The *path* argument may be a compound path, i.e.
 * a path that goes multiple levels deep. In that case, the individual property keys should be separated by a `.`.
 * 
 * If the path is invalid or if any intermediate property has a non-object value, `undefined` is returned. That means
 * that `pluck()` does not recurse down into the properties of, for example, a string or a function.
 * 
 * `pluck()` is curried by default.
 * 
 * @example
 * 
 * const pluck = require('functionish/pluck');
 * 
 * const source = {
 *   name  : 'Hari Seldon',
 *   world : 'Trantor',
 *   book  : {
 *     title  : 'Foundation',
 *     author : {
 *       name : 'Isaac Asimov',
 *     },
 *     year   : 1942
 *   }
 * }
 * 
 * pluck('name', source); // returns 'Hari Seldon'
 * pluck('book.author.name', source); // returns 'Isaac Asimov'
 * pluck('book.year', source); // returns 1942
 * pluck('book.pagecount', source); // returns `undefined`
 * pluck('name.length', source); // returns `undefined`
 * 
 * @func pluck
 * @param {string} path The path of the property to retrieve
 * @param {object} source The object to resolve *path* against
 * @returns {any}
 */
module.exports = require('./curry2')(

    function pluck(path, source) {

        if( notstring(path) ) return source?.[path];

        const index = path.indexOf(KEY_SEPARATOR_CHAR);

        if( notfound(index) ) return source?.[path];

        const [key, nextpath] = [path.slice(0, index), path.slice(index+1)]
        const target = source?.[key];
        
        return isempty(nextpath) ? target
             : notobject(target) ? TARGET_UNDEFINED
             : pluck(nextpath, target);
    }

)