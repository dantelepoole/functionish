/**
 * @module lists/transformer
 */

'use strict';

const TRANSFORM_DISCARD = null;

const and = require('../logic/and');
const compose = require('../compose');
const id = require('../id');
const isempty = require('../misc/isempty');
const or = require('../logic/or');

const compile = transforms => and(...transforms, id);
const filtertransform = filter => data => !!filter(data.value);
const maptransform = map => data => (data.value = map(data.value), true);
const pojo = value => ({value});

class Transformer {

    #transformations = []

    #addmaps(mapfuncs) {
        this.#transformations.push( maptransform( compose(...mapfuncs) ) );
    }

    #addfilters(filterfuncs) {
        this.#transformations.push( ...filterfuncs.map(filtertransform) );
    }

    map(...mapfuncs) {

        isempty(mapfuncs) || this.#addmaps(mapfuncs);
        return this;
    }

    filter(...filterfuncs) {

        isempty(filterfuncs) || this.#addfilters(filterfuncs);
        return this;
    }

    compile() {

        const transformation = compile(this.#transformations);

        return or(
            compose(transformation, pojo),
            TRANSFORM_DISCARD
        )
    }
}

function transformer(...maptransforms) {
    return new Transformer().map(...maptransforms);
}

module.exports = transformer;