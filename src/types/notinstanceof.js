/**
 * @module types/notinstanceof
 */

'use strict';

/**
 * Return true if *anobject* is *not* an instance of *aclass*. Otherwise, return false.
 * 
 * @func notinstanceof
 * @param {function} aclass The class to check against
 * @param {object} anobject The object to check the class for
 * @returns {boolean}
 */
module.exports = function notinstanceof(targetclass, source) {
    return ! (source instanceof targetclass);
}