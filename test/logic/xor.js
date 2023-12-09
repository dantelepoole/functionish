const xor = require('../../src/logic/xor');
const expect = require('chai').expect;
const sinon = require('sinon');

const TRUTHY_VALUE = {};
const FALSY_VALUE = '';

const id = sinon.fake(x=>x);
const always = sinon.fake(x => () => x);
const isnumber = sinon.fake( x => (typeof x === 'number') );
const iseven = sinon.fake( x => (x%2) === 0 );
const isstring = sinon.fake( x => (typeof x === 'string') );

describe('xor()', function() {

    beforeEach(
        function() {
            always.resetHistory();
            id.resetHistory();
            isnumber.resetHistory();
            iseven.resetHistory();
            isstring.resetHistory();
        }
    )

    it('should be curried with unary arity', function() {

        const _xor = xor(isnumber);
        expect(_xor).to.be.a('function');

        const isnumberorstring = _xor(isstring);
        expect( isnumberorstring ).to.be.a('function');

        const result = isnumberorstring('foobar');
        expect(result).to.be.true;

    })

    it('should return a function', function() {
        expect( xor(isnumber, isstring) ).to.be.a('function');
    }) 

    describe('The function returned by xor()', function() {

        it(`should return true if one predicate returns a truthy value and the other predicate returns a falsy value`, function() {

            const _xor = xor(isnumber, isstring);
            expect( _xor(42) ).to.be.true;
        }) 

        it(`should return false if both predicates return a truthy value`, function() {

            const _xor = xor(isnumber, isnumber);
            expect( _xor(42) ).to.be.false;
        }) 

        it(`should return false if both predicates return a falsy value`, function() {

            const _xor = xor(isnumber, isnumber);
            expect( _xor('foobar') ).to.be.false;
        }) 

        it(`should always call both predicates`, function() {

            const _xor = xor(isnumber, id);

            expect(isnumber.callCount).equals(0);
            expect(id.callCount).equals(0);

            _xor('foobar');

            expect(isnumber.callCount).equals(1);
            expect(id.callCount).equals(1);

            _xor(1);

            expect(isnumber.callCount).equals(2);
            expect(id.callCount).equals(2);
        }) 

        it(`should evaluate a predicate's boolish value if the predicate is not a function`, function() {

            expect( xor(FALSY_VALUE, TRUTHY_VALUE)(42) ).to.be.true;
            expect( xor(TRUTHY_VALUE, TRUTHY_VALUE)(false) ).to.be.false;
            expect( xor(FALSY_VALUE, FALSY_VALUE)(42) ).to.be.false;
        }) 

    })
})