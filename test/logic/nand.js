const nand = require('../../src/logic/nand');
const expect = require('chai').expect;

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const isnumber = spy( x => (typeof x === 'number') );
const iseven = spy( x => (x%2) === 0 );

describe('nand()', function() {

    beforeEach(
        function() {
            isnumber.resetHistory();
            iseven.resetHistory();
        }
    )

    it('should return a function', function() {
        expect( nand(isnumber, iseven) ).to.be.a('function');
    }) 


    describe('The function returned by nand()', function() {

        beforeEach(
            function() {
                isnumber.resetHistory();
                iseven.resetHistory();
            }
        )

        it('should return false if no predicates were passed to nand()', function() {
            expect( nand()() ).to.be.false;
        }) 

        it('should return false if all predicates return a truthy value', function() {

            const _nand = nand(iseven, isnumber);
            expect( _nand(42) ).to.be.false;
        }) 

        it('should return true if any predicate returns a falsy value', function() {

            const _nand = nand(iseven, isnumber);
            expect( _nand(41) ).to.be.true;
        }) 

        it('should short-circuit if any predicate returns a falsy value', function() {

            const _nand = nand(iseven, isnumber);

            expect( _nand(41) ).to.be.true;
            expect(isnumber.callCount).to.be.equal(0);
            expect(iseven.callCount).to.be.equal(1);
        }) 

        it('should throw if any predicate is not a function', function() {

            const _nand= nand(isnumber, 'foobar');
            expect( ()=>_nand(42) ).to.throw();
        })

    })
})