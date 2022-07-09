/**
 * @transform
 */

'use strict';

const ERR_BAD_LIST = `TransformError~The list has type %s. Expected an iterable object.`;
const ERR_BAD_TRANSFORMER = `TransformError~The transformer has type %s. Expected a function.`;

const composetransformer = require('./lib/composetransformer');
const fail = require('./fail');
const isarray = require('./isarray');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

module.exports = require('./curry2') (

    function transform(transformer, list) {

        if( isarray(transformer) ) transformer = composetransformer(...transformer);
        else if(typeof transformer !== 'function') fail(ERR_BAD_TRANSFORMER, typeorclass(transformer));
        
        if( notiterable(list) ) fail(ERR_BAD_LIST, typeorclass(list));
        
        return {
            [Symbol.iterator] : function* () {

                for(const item of list) {

                    const transformeditem = transformer(item);

                    if(transformeditem === false) continue;

                    yield (transformeditem === true) ? item : transformeditem;
                }
            }
        }
    }
)
