const noop = require('../src/noop');
const expect = require('chai').expect;

describe( 'noop()', function() {

        it('should alwayrs return undefined', function() {
            expect( noop() ).to.be.undefined;
            expect( noop(42) ).to.be.undefined;
            expect( noop(42, 'fubar') ).to.be.undefined;
        })

    }
);