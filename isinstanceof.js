/**
 * @module isinstanceof
 */

'use strict';

const ERR_BAD_CLASS = `IsInstanceOfError~The class has type %s. Expected a function.`;

const fail = require('./fail');
const notfunction = require('./notfunction');
const typeorclass = require('./typeorclass');

/**
 * Return true if *anobject* is an instance of *theclass*. Otherwise, return false.
 * 
 * `isinstanceof()` is curried by default with binary arity.
 * 
 * @func isinstanceof
 * @param {function} theclass The class to check against
 * @param {object} anobject The object to check the class for
 * @returns {boolean}
 */
module.exports = require('./curry2') (

    function isinstanceof(theclass, anobject) {

        notfunction(theclass) && fail(ERR_BAD_CLASS, typeorclass(theclass));

        return (anobject instanceof theclass);
    }

)