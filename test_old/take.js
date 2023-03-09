const expect = require('chai').expect;
const isiterable = require('../isiterable');
const range = require('../range');
const take = require('../take');

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
            expect( Array.from(curried(range(5)))).to.deep.equal([1,2,3]);
        }
    )

    it(`should return an iterable object producing the first specified number of items in the list`,
        function () {
            expect( isiterable( take(3, range(5)) ) ).to.be.true;
            expect( Array.from(take(3, range(5))) ).to.deep.equal([1,2,3]);
        }
    )

    it(`should throw if the list is not iterable`,
        function () {
            expect( ()=>take(3,{}) ).to.throw();
        }
    )

    it(`should throw if the count is not a positive integer`,
        function () {
            expect( ()=>take(0, []) ).not.to.throw();
            expect( ()=>take(42, []) ).not.to.throw();
            expect( ()=>take(-1, []) ).to.throw();
        }
    )
})