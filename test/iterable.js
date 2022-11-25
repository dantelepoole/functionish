const expect = require('chai').expect;
const isiterable = require('../isiterable');
const iterable = require('../iterable');
const range = require('../range');

describe('iterable()', function() {

    beforeEach(
        function() {
        }
    )

    it('should return an iterable', 
        function () {
            expect( isiterable( iterable( range(5) ) ) ).to.be.true;
        }
    )

    describe(`iterable()'s return value`, function() {

        it(`should produce the list's items`, 
            function () {
                expect( Array.from( iterable( range(5) ) ) ).to.deep.equal([1,2,3,4,5]);
                expect( Array.from( iterable( [] ) ) ).to.deep.equal([]);

                const sentinel = {};
                expect( Array.from( iterable([sentinel]) ) ).to.deep.equal([sentinel]);
            }
        )

        it(`should produce only list itself if list is not iterable`, 
            function () {
                const sentinel = {};
                expect( Array.from( iterable(sentinel) ) ).to.deep.equal([sentinel]);
                expect( Array.from( iterable('foobar') ) ).to.deep.equal(['foobar']);
                expect( Array.from( iterable(42) ) ).to.deep.equal([42]);
                expect( Array.from( iterable(iterable) ) ).to.deep.equal([iterable]);
                expect( Array.from( iterable(null) ) ).to.deep.equal([null]);
                expect( Array.from( iterable(NaN) ) ).to.deep.equal([NaN]);
            }
        )

        it(`should produce no items if list is undefined`, 
            function () {
                const sentinel = {};
                expect( Array.from( iterable() ) ).to.deep.equal([]);
                expect( Array.from( iterable(undefined) ) ).to.deep.equal([]);
            }
        )
    })
})