const when = require('../src/when');
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

describe('when()', function() {

    beforeEach(
        function() {
            invocationcount = 0;
        }
    )

    it('should return a function',
        function () {
            expect( when(iseven, noop) ).to.be.a('function');
        }
    )

    describe('the returned function', function() {

        it('should pass its arguments to the predicate',
            function () {

                const conditional = when(matchandtrack(42,'foobar'), noop);

                expect( invocationcount ).to.be.equal(0);

                conditional(42, 'foobar');
                expect( invocationcount ).to.be.equal(1);

                conditional(42, 'foobar');
                expect( invocationcount ).to.be.equal(2);

            }
        )

        it('should pass its arguments to the mainbranch if the predicate returns a truthy value',
            function () {

                const conditional = when(always(true), matchandtrack(42,'foobar'));

                expect( invocationcount ).to.be.equal(0);

                conditional(42, 'foobar');
                expect( invocationcount ).to.be.equal(1);

                conditional(42, 'foobar');
                expect( invocationcount ).to.be.equal(2);
            }
        )

        it('should pass its arguments to the alternativebranch if the predicate returns a falsy value',
            function () {

                const conditional = when(always(false), noop, matchandtrack(42,'foobar'));

                expect( invocationcount ).to.be.equal(0);

                conditional(42, 'foobar');
                expect( invocationcount ).to.be.equal(1);

                conditional(42, 'foobar');
                expect( invocationcount ).to.be.equal(2);
            }
        )

        it('should return its first argument if the predicate returns a falsy value and no alternative branch is provided',
            function () {

                const conditional = when(always(false), noop);

                const result = conditional(42, 'foobar');
                expect( result ).to.be.equal(42);
            }
        )

        it('should accept non-function values for its predicate',
            function () {

                let conditional = when(42, matchandtrack(42,'foobar'), noop);

                expect( invocationcount ).to.be.equal(0);

                conditional(42, 'foobar');
                expect( invocationcount ).to.be.equal(1);

                conditional = when(0, noop, matchandtrack(42,'foobar'));

                conditional(42, 'foobar');
                expect( invocationcount ).to.be.equal(2);

            }
        )

        it('should accept non-function values for its mainbranch and its alternative branch',
            function () {

                const conditional = when(iseven, 42, 'foobar');
                expect( conditional(1, 'Hari Seldon') ).to.be.equal('foobar');
                expect( conditional(2, 'Hari Seldon') ).to.be.equal(42);

            }
        )
    })

})