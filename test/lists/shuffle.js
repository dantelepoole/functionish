const shuffle = require('../../src/lists/shuffle');
const should = require('../../lib/test/should');

const UNIQ0 = {id:0}
const UNIQ1 = {id:1}
const UNIQ2 = {id:2}

const uniqitems = [UNIQ0, UNIQ1, UNIQ2];
const uniqitemlist = { [Symbol.iterator]:uniqitems.values.bind(uniqitems) }

function isuniqitemsshuffled(items) {

    if( items.length !== uniqitems.length ) return false;

    for(const item of uniqitems) if( !items.includes(item) ) return false;

    return true;
}

describe( 'lists/shuffle()', function() {

        beforeEach(function () {
        })
        
        it('should throw if the argument is not iterable', function() {
            
            should.throw(shuffle, {});
            should.throw(shuffle, shuffle);
            should.throw(shuffle, 42);
            should.throw(shuffle, null);
            should.throw(shuffle, undefined);
        })

        it('should return an array', function() {

            should.return.an.Array(shuffle, uniqitems);
            should.return.an.Array(shuffle, uniqitemlist);
        })

        describe( 'The array returned by shuffle()', function() {

            it('should contain all the items from the list', function() {
                should.be.true( isuniqitemsshuffled( shuffle(uniqitems) ) );
            })
    
        })
    }
);