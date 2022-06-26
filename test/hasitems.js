const expect = require('chai').expect;
const hasitems = require('../hasitems');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

function spylength(indexable) {

    const object = {
        get length() {
            return indexable.length;
        }
    }

    object.spy = spy( object, 'length', ['get'] );

    return object;
}

describe(`hasitems()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should check its argument's length property`,
        function () {
            const indexable = spylength([1]);
            hasitems(indexable);
            expect( indexable.spy.get.callCount ).to.equal(1);
        }
    )

    it(`should return true if the argument has a length property that is larger than 0`,
        function () {
            expect( hasitems([1]) ).to.be.true;
            expect( hasitems('a') ).to.be.true;
            expect( hasitems(hasitems) ).to.be.true;
        }
    )

    it(`should return false if its argument has a length property that is less than 1`,
        function () {
            expect( hasitems([]) ).to.be.false;
            expect( hasitems('') ).to.be.false;
            expect( hasitems(Symbol) ).to.be.false;
            expect( hasitems( {length:-1} ) ).to.be.false;
        }
    )

    it(`should return false if its argument does not have a length property`,
        function () {
            expect( hasitems({}) ).to.be.false;
        }
    )

    it(`should return false if its argument is null, undefined or NaN`,
        function () {
            expect( hasitems(null) ).to.be.false;
            expect( hasitems(NaN) ).to.be.false;
            expect( hasitems(undefined) ).to.be.false;
        }
    )
})
