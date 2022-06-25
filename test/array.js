const array = require('../array');
const expect = require('chai').expect;
const range = require('../range');

describe('array()', function() {

    beforeEach(
        function() {
        }
    )

    it('should return an array containing the items from the iterable in order', 
        function() {
            expect( array([1,2,3]) ).to.be.deep.equal([1,2,3]);
            expect( array(range(5)) ).to.be.deep.equal([1,2,3,4,5]);
        }
    )

    it('should, if the iterable is already an array, return a shallow copy of the array',
        function () {
            const list = [1,2,3];
            expect(array(list)).not.to.be.equal(list);
            expect(array(list)).to.be.deep.equal(list);
        }
    )

    it('should return an empty array if the iterable produces no items', 
        function() {
            expect( array(range(0)) ).to.be.an('array').with.length(0);
        }
    )

    it('should return a single-item array containing if the iterable is not iterable', 
        function() {
            expect(array(42)).to.be.deep.equal([42]);
            expect(array(null)).to.be.deep.equal([null]);

            const sentinel = {}
            expect(array(sentinel)).to.be.deep.equal([sentinel]);
        }
    )

    it('should return an empty array if the iterable is undefined', 
        function() {
            expect( array() ).to.be.an('array').with.length(0);
            expect( array(undefined) ).to.be.an('array').with.length(0);
        }
    )

})