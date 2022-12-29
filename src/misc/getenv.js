/**
 * @module misc/getenv
 */

'use strict';

const environment = process.env;

module.exports = function getenv(key) {
    return environment[key];
}