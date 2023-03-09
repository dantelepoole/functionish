const and = require('../../src/logic/and');
const expect = require('chai').expect;

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const TRUTHY_VALUE = {};
const FALSY_VALUE = '';

const always = spy(x => () => x);
const isnumber = spy( x => (typeof x === 'number') );
const iseven = spy( x => (x%2) === 0 );
const isstring = spy( x => (typeof x === 'string') );

describe('and()', function() {

    beforeEach(
        function() {
            isnumber.resetHistory();
            iseven.resetHistory();
            isstring.resetHistory();
        }
    )

    it('should return a function', function() {
        expect( and(isnumber, iseven) ).to.be.a('function');
    }) 

    describe('The function returned by and()', function() {

        beforeEach(
            function() {
                isnumber.resetHistory();
                iseven.resetHistory();
                isstring.resetHistory();
            }
        )

        it('should return true if no predicates were passed to and()', function() {
            expect( and()() ).to.be.true;
        }) 

        it('should return the return value of the last predicate if all predicates return a truthy value', function() {

            const alwaystrue = spy(() => true);
            const _and = and(isnumber, iseven, alwaystrue);
            expect( _and(42) ).to.be.true;

            expect(isnumber.callCount).to.be.equal(1);
            expect(iseven.callCount).to.be.equal(1);
            expect(alwaystrue.callCount).to.be.equal(1);
        }) 

        it('should call each predicate if all predicates return a truthy value', function() {

            const _and = and(isnumber, iseven, always(TRUTHY_VALUE));
            expect( _and(42) ).to.be.equal(TRUTHY_VALUE);
        }) 

        it('should return the return value of the first predicate that returns a falsy value', function() {

            const _and = and(isnumber, always(FALSY_VALUE), iseven);
            expect( _and(42) ).to.be.equal(FALSY_VALUE);
        }) 

        it('should short-circuit if any predicate returns a falsy value', function() {

            const _and = and(isnumber, isstring, iseven);
            expect( _and(42) ).to.be.false;

            expect(isnumber.callCount).to.be.equal(1);
            expect(isstring.callCount).to.be.equal(1);
            expect(iseven.callCount).to.be.equal(0);
        }) 
    })
})