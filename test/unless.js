const unless = require('../unless');
const expect = require('chai').expect;

function iseven(x) {
    return (x%2) === 0;
}

function always(x) {
    return ()=>x;
}

function noop() {}

let invocationcount = 0;

function matchandtrack(...args) {
    
    return function(...innerargs) {

        invocationcount += 1;
        expect(args).to.be.deep.equal(innerargs);

        return innerargs;
    }
}

describe('unless()', function() {

    beforeEach(
        function() {
            invocationcount = 0;
        }
    )

    it('should return a function',
        function () {
            expect( unless(iseven, noop) ).to.be.a('function');
        }
    )

    describe('the returned function', function() {

        it('should pass its arguments to the predicate',
            function () {

                const conditional = unless(matchandtrack(42,'foobar'), noop);

                expect( invocationcount ).to.be.equal(0);

                conditional(42, 'foobar');
                expect( invocationcount ).to.be.equal(1);

                conditional(42, 'foobar');
                expect( invocationcount ).to.be.equal(2);

            }
        )

        it('should pass its arguments to the mainbranch if the predicate returns a falsy value',
            function () {

                const conditional = unless(always(false), matchandtrack(42,'foobar'));

                expect( invocationcount ).to.be.equal(0);

                conditional(42, 'foobar');
                expect( invocationcount ).to.be.equal(1);

                conditional(42, 'foobar');
                expect( invocationcount ).to.be.equal(2);
            }
        )

        it('should pass its arguments to the alternativebranch if the predicate returns a truthy value',
            function () {

                const conditional = unless(always(true), noop, matchandtrack(42,'foobar'));

                expect( invocationcount ).to.be.equal(0);

                conditional(42, 'foobar');
                expect( invocationcount ).to.be.equal(1);

                conditional(42, 'foobar');
                expect( invocationcount ).to.be.equal(2);
            }
        )

        it('should return its first argument if the predicate returns a truthy value and no alternative branch is provided',
            function () {

                const conditional = unless(always(true), noop);

                const result = conditional(42, 'foobar');
                expect( result ).to.be.equal(42);
            }
        )

        it('should accept non-function values for its predicate',
            function () {

                let conditional = unless(42, noop, matchandtrack(42,'foobar'));

                expect( invocationcount ).to.be.equal(0);

                conditional(42, 'foobar');
                expect( invocationcount ).to.be.equal(1);

                conditional = unless(0, matchandtrack(42,'foobar'));

                conditional(42, 'foobar');
                expect( invocationcount ).to.be.equal(2);

            }
        )

        it('should accept non-function values for its mainbranch and its alternative branch',
            function () {

                const conditional = unless(iseven, 42, 'foobar');
                expect( conditional(1, 'Hari Seldon') ).to.be.equal(42);
                expect( conditional(2, 'Hari Seldon') ).to.be.equal('foobar');

            }
        )
    })

})