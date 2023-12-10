const array = require('../../src/lists/array');
const dispatch = require('../../lib/test/dispatch');
const should = require('../../lib/test/should');

const UNIQTHING = {label:'UNIQTHING'}

const array1to10 = [1,2,3,4,5,6,7,8,9,10];
const list1to10 = { [Symbol.iterator]:Array.prototype.values.bind(array1to10) }
const emptylist = { [Symbol.iterator]:Array.prototype.values.bind([]) }

describe( 'array()', function() {

        it('should throw an error if the list is not an iterable object', function() {
            should.throw(array, {});
        })
        
        it('should return an array', function() {
            should.return.an.Array(array, list1to10);
        })

        it('should return an array containing the items produced by the list', function() {
            should.be.like( array1to10, dispatch(array, list1to10) );
        })

        it('should return an array holding the individual characters of a string argument', function() {
            should.be.like( ['f','u','b','a','r'], dispatch(array, 'fubar') );
        })

        it('should return an empty array if the list produces no items', function() {
            should.be.like( [], dispatch(array, emptylist) );
        })

        it('should return a shallow copy of an array argument', function() {
            
            const source = [UNIQTHING, 42, 'fubar'];
            const shallowcopy = array(source);

            should.be.like(source, shallowcopy);
            should.be(UNIQTHING, shallowcopy[0]);
        })
    }
);