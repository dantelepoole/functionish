const expect = require('chai').expect;
const notempty = require('../src/notempty');

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

describe(`notempty()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should check its argument's length property`,
        function () {
            const indexable = spylength([1]);
            notempty(indexable);
            expect( indexable.spy.get.callCount ).to.equal(1);

            const object = spysize(new Map());
            notempty(object);
            expect(object.spy.get.callCount).to.equal(1);
        }
    )

    it(`should check its argument's size property if it has no length property`,
        function () {
            const indexable = spylength([1]);
            notempty(indexable);
            expect( indexable.spy.get.callCount ).to.equal(1);
        }
    )

    it(`should return true if the argument has a length or size property that is larger than 0`,
        function () {
            expect( notempty([1]) ).to.be.true;
            expect( notempty('a') ).to.be.true;
            expect( notempty(notempty) ).to.be.true;
            expect( notempty(new Set([1,2,3])) ).to.be.true;
            expect( notempty(new Map([[1],[2]])) ).to.be.true;
        }
    )

    it(`should return false if its argument has a length or size property that is less than 1 or a non-numeric length/size property`,
        function () {
            expect( notempty([]) ).to.be.false;
            expect( notempty('') ).to.be.false;
            expect( notempty(Symbol) ).to.be.false;
            expect( notempty( {length:0} ) ).to.be.false;
            expect( notempty( {size:0} ) ).to.be.false;
            expect( notempty( {length:null} ) ).to.be.false;
            expect( notempty( {size:'size'} ) ).to.be.false;
            expect( notempty( new Map() ) ).to.be.false;
            expect( notempty( new Set() ) ).to.be.false;
        }
    )

    it(`should return false if its argument does not have a length or size property`,
        function () {
            expect( notempty({}) ).to.be.false;
        }
    )

    it(`should return false if its argument is null, undefined or NaN`,
        function () {
            expect( notempty(null) ).to.be.false;
            expect( notempty(NaN) ).to.be.false;
            expect( notempty(undefined) ).to.be.false;
        }
    )
})
