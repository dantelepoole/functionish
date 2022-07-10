const expect = require('chai').expect;
const isiterable = require('../src/isiterable');
const range = require('../src/range');
const take = require('../src/take');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

function spyslice(sliceable) {

    const object = {
        slice : (start, end) => sliceable.slice(start, end)
    }

    spy(object, 'slice');

    return object;
}


describe(`take()`, function() {

    it(`should be curried with binary arity`,
        function () {
            const curried = take(3);
            expect(curried).to.be.a('function');
            expect(curried('foobar')).to.be.a('string');
        }
    )

    it(`should invoke the list's slice() method if it has one`,
        function () {

            const sliceable = spyslice(
                {
                    slice(...args) {
                        expect( args.length ).to.equal(2);
                        return args;
                    }
                }
            )

            expect( take(3, sliceable) ).to.deep.equal([0,3]);
            expect( sliceable.slice.calledOnceWith(0,3) ).to.be.true;
        }
    )

    it(`should return a string with the first specified number of characters if the list is a string`,
        function () {

            const string = spyslice('foobar');
            expect( take(3, string) ).to.equal('foo');
            expect( string.slice.calledOnceWith(0,3) ).to.be.true;
        }
    )

    it(`should return an array with the first specified number of items if the list is an array`,
        function () {

            const array = spyslice([1,2,3,4,5]);
            expect( take(3, array) ).to.deep.equal([1,2,3]);
            expect( array.slice.calledOnceWith(0,3) ).to.be.true;
        }
    )

    it(`should return an iterable object producing the first specified number of items if the list is an iterable object`,
        function () {
            expect( isiterable( take(3, range(5)) ) ).to.be.true;
            expect( Array.from(take(3, range(5))) ).to.deep.equal([1,2,3]);
        }
    )

    it(`should throw if the list is neither sliceable nor iterable`,
        function () {
            expect( ()=>take(3,{}) ).to.throw();
        }
    )

    it(`should throw if the count is not a positive integer`,
        function () {
            expect( ()=>take(0, []) ).not.to.throw();
            expect( ()=>take(42, []) ).not.to.throw();
            expect( ()=>take(-1, []) ).to.throw();
            expect( ()=>take('foobar', []) ).to.throw();
        }
    )
})