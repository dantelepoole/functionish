const nor = require('../../src/logic/nor');
const expect = require('chai').expect;

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const TRUTHY_VALUE = {};
const FALSY_VALUE = '';

const always = spy(x => () => x);
const isnumber = spy( x => (typeof x === 'number') );
const iseven = spy( x => (x%2) === 0 );
const isstring = spy( x => (typeof x === 'string') );

describe('nor()', function() {

    beforeEach(
        function() {
            isnumber.resetHistory();
            iseven.resetHistory();
            isstring.resetHistory();
        }
    )

    it('should return a function', function() {
        expect( nor(isnumber, iseven) ).to.be.a('function');
    }) 

    describe('The function returned by nor()', function() {

        beforeEach(
            function() {
                isnumber.resetHistory();
                iseven.resetHistory();
                isstring.resetHistory();
            }
        )

        it('should return true if no predicates were passed to or()', function() {
            expect( nor()() ).to.be.true;
        }) 

        it('should return true if all predicates return a falsy value', function() {

            const alwaysfalse = spy( always(FALSY_VALUE) );
            const _nor = nor(isnumber, iseven, alwaysfalse);
            expect( _nor('foobar') ).to.be.true;
        }) 

        it('should call each predicate if all predicates return a falsy value', function() {

            const alwaysfalse = spy( always(FALSY_VALUE) );
            const _nor = nor(isnumber, iseven, alwaysfalse);
            expect( _nor('foobar') ).to.be.true;

            expect(isnumber.callCount).to.be.equal(1);
            expect(iseven.callCount).to.be.equal(1);
            expect(alwaysfalse.callCount).to.be.equal(1);

        }) 

        it('should return false if any predicate returns a truthy value', function() {

            const _nor = nor(isnumber, always(TRUTHY_VALUE), iseven);
            expect( _nor('foobar') ).to.be.false;
        }) 

        it('should short-circuit if any predicate returns a truthy value', function() {

            const _nor = nor(isnumber, isstring, iseven);
            expect( _nor('foobar') ).to.be.false;

            expect(isnumber.callCount).to.be.equal(1);
            expect(isstring.callCount).to.be.equal(1);
            expect(iseven.callCount).to.be.equal(0);
        }) 
    })
})