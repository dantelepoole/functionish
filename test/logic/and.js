const and = require('../../src/logic/and');
const expect = require('chai').expect;
const sinon = require('sinon');

const TRUTHY_VALUE = {};
const FALSY_VALUE = '';

const always = x => () => x;

const isnumber = sinon.fake( x => (typeof x === 'number') );
const iseven = sinon.fake( x => (x%2) === 0 );
const isstring = sinon.fake( x => (typeof x === 'string') );

describe('logic/and()', function() {

    beforeEach(
        function() {
            isnumber.resetHistory();
            iseven.resetHistory();
            isstring.resetHistory();
        }
    )

    it('should return a function', function() {

        expect( and() ).to.be.a('function');
        expect( and(isnumber) ).to.be.a('function');
        expect( and(isnumber, iseven) ).to.be.a('function');
    }) 

    describe('The function returned by and()', function() {

        it('should return true if no predicates were passed to and()', function() {

            const conjunct = and();

            expect( conjunct() ).to.be.true;
        }) 

        it('should return the return value of the last predicate if all predicates return a truthy value', function() {

            const alwaystruthy = sinon.fake( always(TRUTHY_VALUE) );
            const isevennumber = and( isnumber, iseven, alwaystruthy );
            
            const retval = isevennumber(42);

            expect( !!isnumber.returnValues[0] ).to.be.true;
            expect( !!iseven.returnValues[0] ).to.be.true;
            expect(retval).to.be.equal(TRUTHY_VALUE);

        }) 

        it('should call each predicate if all predicates return a truthy value', function() {

            const alwaystruthy = sinon.fake( always(TRUTHY_VALUE) );
            
            expect( isnumber.callCount ).to.equal(0);
            expect( iseven.callCount ).to.equal(0);
            expect( alwaystruthy.callCount ).to.equal(0);

            const isevennumber = and( isnumber, iseven, alwaystruthy );
            
            isevennumber(42);

            expect( isnumber.callCount ).to.equal(1);
            expect( iseven.callCount ).to.equal(1);
            expect( alwaystruthy.callCount ).to.equal(1);

        }) 

        it('should return the return value of the first predicate that returns a falsy value', function() {

            const conjunct = and(isnumber, always(FALSY_VALUE), iseven);

            expect( conjunct(42) ).to.be.equal(FALSY_VALUE);
        }) 

        it('should short-circuit if any predicate returns a falsy value', function() {

            const alwaysfalsy = sinon.fake( always(FALSY_VALUE) );
            
            expect( isnumber.callCount ).to.equal(0);
            expect( alwaysfalsy.callCount ).to.equal(0);
            expect( iseven.callCount ).to.equal(0);

            const isevennumber = and( isnumber, alwaysfalsy, iseven );
            
            isevennumber(41);

            expect( isnumber.callCount ).to.equal(1);
            expect( alwaysfalsy.callCount ).to.equal(1);
            expect( iseven.callCount ).to.equal(0);
        }) 

        it(`should evaluate a predicate's value if the predicate is not a function`, function() {

            expect( and(isnumber, iseven, TRUTHY_VALUE)(42) ).to.equal(TRUTHY_VALUE);
            expect( and(isnumber, iseven, FALSY_VALUE)(42) ).to.equal(FALSY_VALUE);
        })
    })
})