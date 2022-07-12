const expect = require('chai').expect;
const pop = require('../pop');

const sentinel = {};

describe(`pop()`, function() {

    it(`should return the last item in the array`,
        function() {
            expect( pop([1,2,sentinel]) ).to.equal(sentinel);
        }
    )

    it(`should remove the last item from the array`,
        function() {
            const array = [sentinel];

            expect( array.length ).to.equal(1);
            expect( pop(array) ).to.equal(sentinel);
            expect( array.length ).to.equal(0);
        }
    )

    it(`should return undefined if the array is empty`,
        function() {
            expect( pop([]) ).to.be.undefined;
        }
    )

    it(`should throw if the argument has no pop() method`,
        function() {
            expect( ()=>pop({}) ).to.throw();
            expect( ()=>pop() ).to.throw();
            expect( ()=>pop(null) ).to.throw();
        }
    )
})