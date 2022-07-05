/**
 * @module isinstanceof
 */

'use strict';

const ERR_BAD_CLASS = `IsInstanceOfError~The class has type %s. Expected a function.`;

const fail = require('./fail');
const typeorclass = require('./typeorclass');

/**
 * Return true if *anobject* is an instance of *aclass*. Otherwise, return false.
 * 
 * @func isinstanceof
 * @param {function} aclass The class to check against
 * @param {object} anobject The object to check the class for
 * @returns {boolean}
 */
module.exports = require('./curry2') (

    function isinstanceof(aclass, anobject) {

        if(typeof aclass !== 'function') fail(ERR_BAD_CLASS, typeorclass(aclass));

        return (anobject instanceof aclass);
    }

)