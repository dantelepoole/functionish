const unless = require('../src/unless');
const expect = require('chai').expect;
const sinon = require('sinon');

const isarray = sinon.fake(Array.isArray);
const lift = sinon.fake(x => [x]);
const iseven = sinon.fake( x => (x%2 === 0) );
const sum = sinon.fake( (...args) => args.reduce( (a,b)=>(a+b), 0 ) );

describe( 'unless()', function() {

    beforeEach(function () {
        sinon.resetHistory();
        isarray.resetHistory();
        iseven.resetHistory();
        lift.resetHistory();
        sum.resetHistory();
    })

    it('should return a function', function() {
        expect( unless(Array.isArray, lift) ).to.be.a('function');
    })

    it(`should throw if the condition is not a function`, function() {
        expect( () => unless(null, lift) ).to.throw;
        expect( () => unless(undefined, lift) ).to.throw;
        expect( () => unless(42, lift) ).to.throw;
        expect( () => unless({}, lift) ).to.throw;
    })

    it('should be curried with unary arity', function() {
        
        const unlessisarray = unless(Array.isArray);
        expect(unlessisarray).to.be.a('function');

        const toarray = unlessisarray(lift);
        expect(toarray).to.be.a('function');

        expect( toarray(42) ).not.to.be.a('function');

    })

    describe( 'The returned function should', function() {

        it('should pass its arguments to the condition', function() {
            
            const sumifodd = unless(iseven, sum);

            sumifodd(42, 1, 2, 3);

            expect(iseven.args[0]).to.deep.equal( [42,1,2,3] );
        })

        it(`should pass its arguments to the branch and return the branch's return value if the condition returns a falsy value`, function() {
            
            const sumifodd = unless(iseven, sum);

            const retval = sumifodd(41, 1, 2, 3);

            expect(sum.args[0]).to.deep.equal( [41,1,2,3] );
            expect(retval).to.equal(47);
        })

        it('should not invoke the branch if the condition returns a truthy value', function() {
            
            const sumifodd = unless(iseven, sum);

            sumifodd(42, 1, 2, 3);

            expect(sum.callCount).to.equal(0);
        })

        it('should return its first argument if the condition returns a truthy value', function() {
            
            const sumifodd = unless(iseven, sum);

            const retval = sumifodd(42, 1, 2, 3);

            expect(retval).to.equal(42);
        })
    })
})