const boolify = require('../../src/logic/boolify');
const expect = require('chai').expect;

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const id = spy(x => x);

describe('boolify()', function() {

    beforeEach(
        function() {
            id.resetHistory();
        }
    )

    it('should return a function', function() {
        expect( boolify(id) ).to.be.a('function');
    }) 

    describe('The function returned by boolify()', function() {

        beforeEach(
            function() {
                id.resetHistory();
            }
        )

        it('should pass its arguments to the function passed to not()', function() {

            const _id = boolify(id);

            _id(42);
            expect( id.callCount ).to.be.equal(1);
            expect( id.getCall(0).args.length ).to.be.equal(1);
            expect( id.getCall(0).args[0] ).to.be.equal(42);

            _id(null);
            expect( id.callCount ).to.be.equal(2);
            expect( id.getCall(1).args.length ).to.be.equal(1);
            expect( id.getCall(1).args[0] ).to.be.equal(null);
        }) 

        it(`should convert the function's return value to a boolean value`, function() {

            const _id = boolify(id);

            expect( _id(true) ).to.be.true;
            expect( _id(false) ).to.be.false;
            expect( _id(null) ).to.be.false;
            expect( _id(undefined) ).to.be.false;
            expect( _id() ).to.be.false;
            expect( _id(0) ).to.be.false;
            expect( _id(NaN) ).to.be.false;
            expect( _id('') ).to.be.false;
            expect( _id(1) ).to.be.true;
            expect( _id(-1) ).to.be.true;
            expect( _id({}) ).to.be.true;
            expect( _id([]) ).to.be.true;
            expect( _id('foobar') ).to.be.true;
            expect( _id(id) ).to.be.true;
        }) 
    })
})