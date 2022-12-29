/**
 * @module types/notboolean
 */

'use strict';

module.exports = function notboolean(value) {
    return (typeof value !== 'boolean');
}