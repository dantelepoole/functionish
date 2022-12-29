/**
 * @module withdefault
 */

'use strict';

const coalesce = require('./coalesce');
const compose = require('./compose');

module.exports = function withdefault(defaultvalue, func) {
    return compose( coalesce(defaultvalue), func );
}