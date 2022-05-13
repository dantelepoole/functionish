const expect = require('chai').expect;
const ispredicate = require('../ispredicate');
const tagaspredicate = require('../tagaspredicate');

const PREDICATE_TAG = Symbol.for('functionish/predicate/tag');

function isevenfactory() {

    return function iseven(x) {
        return (x%2) === 0;
    }
}

describe(`tagaspredicate()`, function() {

    beforeEach( function() {
    })
    
    it(`should define a symbol property on the argument with the predicate tag as both the key and the value`,
        function () {

            const iseven = isevenfactory();

            expect( ispredicate(iseven) ).to.be.false;

            tagaspredicate(iseven);

            expect( ispredicate(iseven) ).to.be.true;
        }
    )

    it(`should throw if the argument is not a function`,
        function () {

            expect( ()=>tagaspredicate(null) ).to.throw();
            expect( ()=>tagaspredicate(undefined) ).to.throw();
            expect( ()=>tagaspredicate() ).to.throw();
            expect( ()=>tagaspredicate(42) ).to.throw();
            expect( ()=>tagaspredicate([]) ).to.throw();
            expect( ()=>tagaspredicate({}) ).to.throw();
            expect( ()=>tagaspredicate('foobar') ).to.throw();
            expect( ()=>tagaspredicate(42n) ).to.throw();
            expect( ()=>tagaspredicate(false) ).to.throw();
            expect( ()=>tagaspredicate(Symbol()) ).to.throw();

        }
    )

    it(`should define a property that is non-enumerable, non-configurable and non-writable`,
        function () {

            const iseven = isevenfactory();

            expect( ispredicate(iseven) ).to.be.false;
            tagaspredicate(iseven);

            const descriptor = Object.getOwnPropertyDescriptor(iseven, PREDICATE_TAG);

            expect(descriptor).to.be.an('object');
            expect(descriptor.configurable).to.be.false;
            expect(descriptor.enumerable).to.be.false;
            expect(descriptor.writable).to.be.false;
            expect(descriptor.value).to.be.equal(PREDICATE_TAG);

        }
    )
})