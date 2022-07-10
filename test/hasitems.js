const expect = require('chai').expect;
const hasitems = require('../src/hasitems');

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

function spysize(objectwithsize) {
    
    const object = {
        get size() {
            return objectwithsize.size;
        }
    }

    object.spy = spy( object, 'size', ['get'] );

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

            const object = spysize(new Map());
            hasitems(object);
            expect(object.spy.get.callCount).to.equal(1);
        }
    )

    it(`should check its argument's size property if it has no length property`,
        function () {
            const indexable = spylength([1]);
            hasitems(indexable);
            expect( indexable.spy.get.callCount ).to.equal(1);
        }
    )

    it(`should return true if the argument has a length or size property that is larger than 0`,
        function () {
            expect( hasitems([1]) ).to.be.true;
            expect( hasitems('a') ).to.be.true;
            expect( hasitems(hasitems) ).to.be.true;
            expect( hasitems(new Set([1,2,3])) ).to.be.true;
            expect( hasitems(new Map([[1],[2]])) ).to.be.true;
        }
    )

    it(`should return false if its argument has a length or size property that is less than 1 or a non-numeric length/size property`,
        function () {
            expect( hasitems([]) ).to.be.false;
            expect( hasitems('') ).to.be.false;
            expect( hasitems(Symbol) ).to.be.false;
            expect( hasitems( {length:0} ) ).to.be.false;
            expect( hasitems( {size:0} ) ).to.be.false;
            expect( hasitems( {length:null} ) ).to.be.false;
            expect( hasitems( {size:'size'} ) ).to.be.false;
            expect( hasitems( new Map() ) ).to.be.false;
            expect( hasitems( new Set() ) ).to.be.false;
        }
    )

    it(`should return false if its argument does not have a length or size property`,
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
