const nor = require('../../src/logic/nor');
const expect = require('chai').expect;
const sinon = require('sinon');

const TRUTHY_VALUE = {};
const FALSY_VALUE = '';

const always = x => () => x;
const isnumber = sinon.fake( x => (typeof x === 'number') );
const iseven = sinon.fake( x => (x%2) === 0 );
const isstring = sinon.fake( x => (typeof x === 'string') );

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

        it('should return true if no predicates were passed to or()', function() {
            expect( nor()() ).to.be.true;
        }) 

        it('should return true if all predicates return a falsy value', function() {

            const _nor = nor(isnumber, iseven, always(FALSY_VALUE));
            expect( _nor('foobar') ).to.be.true;
        }) 

        it('should return false if any predicate returns a truthy value', function() {

            const _nor = nor(isnumber, iseven, always(TRUTHY_VALUE));
            expect( _nor('foobar') ).to.be.false;
        }) 

        it('should call each predicate if all predicates return a falsy value', function() {

            const alwaysfalse = sinon.fake( always(FALSY_VALUE) );
            const _nor = nor(isnumber, iseven, alwaysfalse);

            expect(isnumber.callCount).to.be.equal(0);
            expect(iseven.callCount).to.be.equal(0);
            expect(alwaysfalse.callCount).to.be.equal(0);

            _nor('foobar');

            expect(isnumber.callCount).to.be.equal(1);
            expect(iseven.callCount).to.be.equal(1);
            expect(alwaysfalse.callCount).to.be.equal(1);

        }) 

        it('should short-circuit if any predicate returns a truthy value', function() {

            const _nor = nor(isnumber, isstring, iseven);
            _nor('foobar');

            expect(isnumber.callCount).to.be.equal(1);
            expect(isstring.callCount).to.be.equal(1);
            expect(iseven.callCount).to.be.equal(0);
        }) 

        it(`should evaluate a predicate's value if the predicate is not a function`, function() {

            expect( nor(isnumber, TRUTHY_VALUE, isstring)({}) ).to.be.false;
            expect( nor(isnumber, isstring, FALSY_VALUE)({}) ).to.be.true;
        })
    })
})