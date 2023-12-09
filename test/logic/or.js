const or = require('../../src/logic/or');
const expect = require('chai').expect;
const sinon = require('sinon');

const TRUTHY_VALUE = {};
const FALSY_VALUE = '';

const always = x => () => x;

const isnumber = sinon.fake( x => (typeof x === 'number') );
const iseven = sinon.fake( x => (x%2) === 0 );
const isstring = sinon.fake( x => (typeof x === 'string') );

describe('or()', function() {

    beforeEach(
        function() {
            isnumber.resetHistory();
            iseven.resetHistory();
            isstring.resetHistory();
        }
    )

    it('should return a function', function() {

        expect( or() ).to.be.a('function');
        expect( or(isnumber) ).to.be.a('function');
        expect( or(isnumber, iseven) ).to.be.a('function');
    }) 

    describe('The function returned by or()', function() {

        it('should return false if no predicates were passed to or()', function() {

            const disjunct = or();

            expect( disjunct() ).to.be.false;
        }) 

        it('should return the return value of the last predicate if all predicates return a falsy value', function() {

            const alwaysfalsy = sinon.fake( always(FALSY_VALUE) );
            const isnumberorstring = or( isnumber, isstring, alwaysfalsy );
            
            const retval = isnumberorstring({});

            expect( !!isnumber.returnValues[0] ).to.be.false;
            expect( !!isstring.returnValues[0] ).to.be.false;
            expect(retval).to.be.equal(FALSY_VALUE);

        }) 

        it('should call each predicate if all predicates return a falsy value', function() {

            const alwaysfalsy = sinon.fake( always(FALSY_VALUE) );
            
            expect( isnumber.callCount ).to.equal(0);
            expect( isstring.callCount ).to.equal(0);
            expect( alwaysfalsy.callCount ).to.equal(0);

            const isstringornumber = or( isnumber, isstring, alwaysfalsy );
            
            isstringornumber({});

            expect( isnumber.callCount ).to.equal(1);
            expect( isstring.callCount ).to.equal(1);
            expect( alwaysfalsy.callCount ).to.equal(1);

        }) 

        it('should return the return value of the first predicate that returns a truthy value', function() {

            const disjunct = or(isnumber, always(TRUTHY_VALUE), isstring);

            expect( disjunct({}) ).to.be.equal(TRUTHY_VALUE);
        }) 

        it('should short-circuit if any predicate returns a truthy value', function() {

            const alwaystruthy = sinon.fake( always(TRUTHY_VALUE) );
            
            expect( isnumber.callCount ).to.equal(0);
            expect( alwaystruthy.callCount ).to.equal(0);
            expect( isstring.callCount ).to.equal(0);

            const isnumberorstring = or( isnumber, alwaystruthy, isstring );
            
            isnumberorstring({});

            expect( isnumber.callCount ).to.equal(1);
            expect( alwaystruthy.callCount ).to.equal(1);
            expect( isstring.callCount ).to.equal(0);
        }) 

        it(`should evaluate a predicate's value if the predicate is not a function`, function() {

            expect( or(isnumber, TRUTHY_VALUE, isstring)({}) ).to.equal(TRUTHY_VALUE);
            expect( or(isnumber, isstring, FALSY_VALUE)({}) ).to.equal(FALSY_VALUE);
        })
    })
})