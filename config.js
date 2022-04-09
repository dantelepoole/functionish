/**
 * Exposes certain configuration settings to the other modules
 * 
 * @module config
 * @ignore
 */

'use strict';

const environment = {
    NAMED_FUNCTIONS : 'FUNCTIONISH_NAMED_FUNCTIONS'
}

module.exports.NAMED_FUNCTIONS = getenvNAMED_FUNCTIONS();

function getenvNAMED_FUNCTIONS() {

    const envvar = process.env[ environment.NAMED_FUNCTIONS ];

    return (envvar !== undefined) && (envvar.toLowerCase() !== 'false' && envvar !== '0');
}