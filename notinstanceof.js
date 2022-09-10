/**
 * @module notinstanceof
 */

'use strict';

const ERR_BAD_CLASS = `IsInstanceOfError~The class has type %s. Expected a function.`;

const fail = require('./fail');
const isfunction = require('./isfunction');
const not = require('./not');
const typeorclass = require('./typeorclass');

/**
 * Return true if *anobject* is *not* an instance of *aclass*. Otherwise, return false.
 * 
 * `notinstanceof()` is curried by default with binary arity.
 * 
 * @func notinstanceof
 * @param {function} aclass The class to check against
 * @param {object} anobject The object to check the class for
 * @returns {boolean}
 */
module.exports = require('./curry2') (

    function notinstanceof(aclass, anobject) {

        return isfunction(aclass) ? not(anobject instanceof aclass)
                                  : fail(ERR_BAD_CLASS, typeorclass(aclass));
    }

)