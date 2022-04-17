/** 
 * @module pcatch
 */

'use strict';

module.exports = require('./curry2')(

    function pcatch(errorhandler, promise) {
        return promise.catch(errorhandler);
    }
)