const range = require('../range');
const expect = require('chai').expect;
const isiterable = require('../isiterable');

function toarray(iterable) {
    expect( isiterable(iterable) ).to.be.true;
    return Array.from(iterable);
}

describe('range()', function() {

    beforeEach(
        function() {
        }
    )

    it('should return an iterable that produces all integers from 1 through the count argument', 
        function() {
            expect( toarray(range(5)) ).to.be.deep.equal([1,2,3,4,5]);
        }
    )

    it('should return an empty iterable if the count is 0', 
        function() {
            expect( toarray(range(0)) ).to.be.deep.equal([]);
        }
    )

    it('should return an empty iterable if the count is not a number', 
        function() {
            expect( toarray(range('foobar')) ).to.be.deep.equal([]);
            expect( toarray(range(NaN)) ).to.be.deep.equal([]);
            expect( toarray(range(null)) ).to.be.deep.equal([]);
            expect( toarray(range()) ).to.be.deep.equal([]);
            expect( toarray(range(undefined)) ).to.be.deep.equal([]);
        }
    )

    it('should return an empty iterable if the count is negative', 
        function() {
            expect( toarray(range(-42)) ).to.be.deep.equal([]);
        }
    )
})