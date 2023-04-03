const or = require('../../src/logic/or');
const expect = require('chai').expect;

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const TRUTHY_VALUE = {};
const FALSY_VALUE = '';

const always = spy(x => () => x);
const isnumber = spy( x => (typeof x === 'number') );
const iseven = spy( x => (x%2) === 0 );
const isstring = spy( x => (typeof x === 'string') );

describe('or()', function() {

    beforeEach(
        function() {
            isnumber.resetHistory();
            iseven.resetHistory();
            isstring.resetHistory();
        }
    )

    it('should return a function', function() {
        expect( or(isnumber, iseven) ).to.be.a('function');
    }) 

    describe('The function returned by or()', function() {

        beforeEach(
            function() {
                isnumber.resetHistory();
                iseven.resetHistory();
                isstring.resetHistory();
            }
        )

        it('should return false if no predicates were passed to or()', function() {
            expect( or()() ).to.be.false;
        }) 

        it('should return the return value of the last predicate if all predicates return a falsy value', function() {

            const alwaysfalse = spy( always(FALSY_VALUE) );
            const _or = or(isnumber, iseven, alwaysfalse);
            expect( _or('foobar') ).to.be.equal(FALSY_VALUE);
        }) 

        it('should call each predicate if all predicates return a falsy value', function() {

            const alwaysfalse = spy( always(FALSY_VALUE) );
            const _or = or(isnumber, iseven, alwaysfalse);
            expect( _or('foobar') ).to.be.equal(FALSY_VALUE);

            expect(isnumber.callCount).to.be.equal(1);
            expect(iseven.callCount).to.be.equal(1);
            expect(alwaysfalse.callCount).to.be.equal(1);

        }) 

        it('should return the return value of the first predicate that returns a truthy value', function() {

            const _or = or(isnumber, always(TRUTHY_VALUE), iseven);
            expect( _or('foobar') ).to.be.equal(TRUTHY_VALUE);
        }) 

        it('should short-circuit if any predicate returns a truthy value', function() {

            const _or = or(isnumber, isstring, iseven);
            expect( _or('foobar') ).to.be.true;

            expect(isnumber.callCount).to.be.equal(1);
            expect(isstring.callCount).to.be.equal(1);
            expect(iseven.callCount).to.be.equal(0);
        }) 
    })
})