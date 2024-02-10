/**
 * @module lists/transformer
 */

'use strict';

const True = require('../True');
const and = require('../logic/and');
const compose = require('../compose');
const isempty = require('../misc/isempty');

const initfiltertransform = filter => data => !!filter(data.value);
const initfiltertransforms = compose(initfiltertransform, and);
const initmaptransform = map => data => True(data.value = map(data.value));
const initmaptransforms = compose(initmaptransform, compose);

class Transformer {

    #transforms = []

    map(...transforms) {
        isempty(transforms) || this.#transforms.push( initmaptransforms(...transforms) );
        return this;
    }

    filter(...transforms) {
        isempty(transforms) || this.#transforms.push( initfiltertransforms(...transforms) );
        return this;
    }

    compile() {
        return _transformer.bind(null, this.#transforms.slice());
    }
}

function transformer(...maptransforms) {
    
    return isempty(maptransforms)
         ? new Transformer()
         : new Transformer().map(...maptransforms);
}

function _transformer(transforms, value) {
T
    const data = { value }

    let success = true;

    for(let i = 0; success && i < transforms.length; i += 1) success = transforms[i](data);

    return success ? data : null;
}

module.exports = transformer;