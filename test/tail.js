const expect = require('chai').expect;
const tail = require('../tail');
const isiterable = require('../isiterable');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

function spyslice(sliceable) {

    const object = {
        slice : (start, end) => sliceable.slice(start, end)
    }

    spy(object, 'slice');

    return object;
}

function* range(count) {

    let counter = 0;

    while( counter < count ) yield ++counter;

}

describe(`tail()`, function() {

    it(`should return an array without the iterable's first element if the iterable is an array`,
        function () {

            const array = spyslice( [1,2,3,4,5] );

            expect( tail(array) ).to.deep.equal([2,3,4,5]);

            expect( array.slice.calledOnceWith(1) ).to.be.true;
        }
    )

    it(`should return a string without the iterable's first character if the iterable is a string`,
        function () {
            
            const string = spyslice( 'foobar' );

            expect( tail(string) ).to.equal('oobar');

            expect( string.slice.calledOnceWith(1) ).to.be.true;
        }
    )

    it(`should return an iterable without the iterable's first item if the iterable is neither an array nor a string`,
        function () {
            const result = tail( range(5) );
            expect( isiterable(result) ).to.be.true;
            expect( Array.from(result) ).to.deep.equal([2,3,4,5]);
        }
    )
})