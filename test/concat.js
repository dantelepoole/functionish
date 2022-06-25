const expect = require('chai').expect;
const concat = require('../concat');
const isiterable = require('../isiterable');
const range = require('../range');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const array = spy( require('../array') );

const sentinel = Object.freeze({});

function* emptyiterable() {
    // noop
}

describe('concat()', function() {

    beforeEach(
        function() {

        }
    )

    it('should return an iterable',
        function () {
            expect( isiterable( concat( range(3), range(3) ) ) ).to.be.true;
        }
    )

    it('should throw if either list is not an iterable object',
        function () {
            expect( () => concat({},{}) ).to.throw();
        }
    )

    describe('the iterable object returned by concat()', function() {

        it('should produce the items of the first list followed by those of the second list',
            function () {
                const result = array( concat([1,2,3], [4,5,6]) );
                expect(result).to.be.deep.equal( [1,2,3,4,5,6] );
            }
        )

        it('should return an empty iterable if both lists are empty',
            function () {
                expect( array( concat([], []) ) ).to.be.deep.equal( [] );
            }
        )


        it('should be curried',
            function () {

                const curried = concat([1,2,3]);
                expect(curried).to.be.a('function');

                const result = curried([4,5,6]);
                expect( isiterable(result) ).to.be.true;
            }
        )

    })

})