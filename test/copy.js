const expect = require('chai').expect;
const copy = require('../copy');

const sourceprototype = { type: 'sourceproto' };
const sourceobject = Object.create(sourceprototype);
sourceobject.data = [1,2,3];
sourceobject.method = function () { return 'method' };
Object.defineProperty(sourceobject, 'list', {getter: () => { return 'foobar' }, setter: arg => {}});

Object.freeze(sourceobject);

describe(`copy()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should create a shallow copy of an array argument`,
        function () {
            const array = [1,2,3];
            const result = copy(array);
            expect(result).not.to.be.equal(array);
            expect(result).to.be.deep.equal(array);

            expect( copy([]) ).to.be.deep.equal([]);
        }
    )

    it(`should create a shallow copy of an object argument`,
        function () {
            const clone = copy(sourceobject);
            expect(clone).not.to.be.equal(sourceobject);
            expect(clone).to.be.deep.equal(sourceobject);

            expect(clone.data).to.be.equal(sourceobject.data);
            expect(clone.method).to.be.equal(sourceobject.method);
        }
    )

    it(`should simply return arguments primitive values`,
        function () {
            expect( copy(42) ).to.be.equal(42);
            expect( copy(true) ).to.be.equal(true);
            expect( copy(null) ).to.be.equal(null);
            expect( copy(undefined) ).to.be.equal(undefined);
            expect( copy('foobar') ).to.be.equal('foobar');
            expect( copy(42n) ).to.be.equal(42n);
            expect( copy(NaN) ).to.be.NaN;
        }
    )
})