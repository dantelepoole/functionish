const expect = require('chai').expect;
const preject = require('../preject');

function noop() {}

describe(`preject()`, function() {

    beforeEach(
        function() {
            expecterrorcalled = false;
        }
    )

    it(`should return a promise`,
        function () {
            const promise = preject( new Error('foobar') );
            expect( promise ).to.be.a('Promise');
            return promise.catch( noop );
        }
    )

    it(`should return a promise that rejects with the argument passed to preject()`,
        function () {
            const error = new Error('foobar');
            return preject( error )
                        .catch( x => expect(x).to.be.equal(error) );
        }
    )

    it(`should work with non-Error arguments`,
        function () {
            const error = 'string error';
            return preject( error )
                        .catch( x => expect(x).to.be.equal(error) );
        }
    )
})