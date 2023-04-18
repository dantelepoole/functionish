const xor = require('../../src/logic/xor');
const expect = require('chai').expect;

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const TRUTHY_VALUE = {};
const FALSY_VALUE = '';

const always = spy(x => () => x);
const isnumber = spy( x => (typeof x === 'number') );
const iseven = spy( x => (x%2) === 0 );
const isstring = spy( x => (typeof x === 'string') );

describe('xor()', function() {

    beforeEach(
        function() {
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

    it('should accept functions as predicates', function() {
        
        const isnumberorstring = xor(isnumber, isstring);
        expect( isnumberorstring('foobar') ).to.be.true;
        expect( isnumberorstring(42) ).to.be.true;
        expect( isnumberorstring({}) ).to.be.false;

    }) 

    it('should accept non-functions as predicates', function() {
        
        const isnumberorstring = xor(TRUTHY_VALUE, FALSY_VALUE);
        expect( isnumberorstring() ).to.be.true;
        
    }) 

    describe('The function returned by xor()', function() {

        beforeEach(
            function() {
                isnumber.resetHistory();
                iseven.resetHistory();
                isstring.resetHistory();
            }
        )

        it(`should return true if either predicate returns a truthy value and the other predicate returns a falsy value`, function() {

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

    })
})