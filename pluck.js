'use strict';

const EMPTY_STRING = '';
const INDEX_NOT_FOUND = -1;
const KEY_SEPARATOR_CHAR = '.';
const TARGET_NOT_FOUND = undefined;

const notobject = value => (typeof value !== 'object' || value === null);

/**
 * Return the value of the property of *source* identified by *path*. The *path* argument may be a compound path, i.e.
 * a path that goes multiple levels deep. In that case, the individual property keys should be separated by a `.`.
 * 
 * If the path is invalid or if any intermediate property has a non-object value, `undefined` is returned. That means
 * that `pluck()` does not recurse down into the properties of, for example, a string or a function.
 * 
 * `pluck()` is curried by default.
 * 
 * @module pluck
 * @param {string} path The path of the property to retrieve
 * @param {object} source The object to resolve *path* against
 * @returns {any}
 * @example
 *     const pluck = require('functionish/pluck');
 * 
 *     const source = {
 *       name  : 'Hari Seldon',
 *       world : 'Trantor',
 *       book  : {
 *         title  : 'Foundation',
 *         author : {
 *           name : 'Isaac Asimov',
 *         },
 *         year   : 1942
 *       }
 *     }
 * 
 *     pluck('name', source); // returns 'Hari Seldon'
 *     pluck('book.author.name', source); // returns 'Isaac Asimov'
 *     pluck('book.year', source); // returns 1942
 *     pluck('book.pagecount', source); // returns `undefined`
 *     pluck('name.length', source); // returns `undefined`
 */
module.exports = require('./curry2')(

    function pluck(path, source) {

        if( typeof path !== 'string') return source?.[path];

        const index = path.indexOf(KEY_SEPARATOR_CHAR);

        if( index === INDEX_NOT_FOUND ) return source?.[path];

        const [key, nextpath] = [path.slice(0,index), path.slice(index+1)]
        const target = source?.[key];
        
        return (nextpath === EMPTY_STRING) ? target
             : notobject(target) ? TARGET_NOT_FOUND 
             : pluck(nextpath, target);
    }

)