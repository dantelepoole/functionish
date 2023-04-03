const not = require('../../src/logic/not');
const expect = require('chai').expect;

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const isstringtrue = spy(str => (str === 'true'));

describe('not()', function() {

    beforeEach(
        function() {
            isstringtrue.resetHistory();
        }
    )

    it('should return a function if its argument is a function', function() {
        expect( not(isstringtrue) ).to.be.a('function');
    }) 

    it('should return the boolean complement of its argument if its argument is not a function', function() {
        
        expect( not(true) ).to.be.false;
        expect( not(false) ).to.be.true;
        expect( not('') ).to.be.true;
        expect( not(null) ).to.be.true;
        expect( not(1) ).to.be.false;
        expect( not(undefined) ).to.be.true;
        expect( not('x') ).to.be.false;
        expect( not('') ).to.be.true;
        expect( not({}) ).to.be.false;
    }) 

    it('should return true if called without arguments', function() {
        expect( not() ).to.be.true;
    }) 

    describe('The function returned by not()', function() {

        beforeEach(
            function() {
                isstringtrue.resetHistory();
            }
        )

        it('should pass its arguments to the function passed to not()', function() {

            const _not = not(isstringtrue);

            _not('true');
            expect( isstringtrue.callCount ).to.be.equal(1);
            expect( isstringtrue.getCall(0).args.length ).to.be.equal(1);
            expect( isstringtrue.getCall(0).args[0] ).to.be.equal('true');

            _not('false');
            expect( isstringtrue.callCount ).to.be.equal(2);
            expect( isstringtrue.getCall(1).args.length ).to.be.equal(1);
            expect( isstringtrue.getCall(1).args[0] ).to.be.equal('false');
        }) 

        it('should return the boolean complement of the return value of the function passed to not()', function() {

            const _not = not(isstringtrue);

            expect( _not('true') ).to.be.false;
            expect( _not('false') ).to.be.true;
        }) 
    })
})