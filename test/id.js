const id = require('../src/id');
const expect = require('chai').expect;

const UNIQTHING = {}

describe( 'id()', function() {

        it('should return its first argument', function() {

            const array = [42, 'fubar', UNIQTHING];

            expect( id(42) ).to.equal(42);
            expect( id(null) ).to.be.null;
            expect( id(UNIQTHING) ).to.equal(UNIQTHING);
            expect( id(id) ).to.equal(id);
            expect( id(array) ).to.equal(array);
        })

        it('should ignore any further arguments', function() {
            expect( id(UNIQTHING, 42, 'fubar') ).to.equal(UNIQTHING);
        })

        it(`should return undefined if no arguments are passed`, function() {
            expect( id() ).to.be.undefined;
        })
    }
);