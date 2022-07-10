const expect = require('chai').expect;
const uniqfilter = require('../uniqfilter');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

describe(`uniqfilter()`, function() {

    afterEach(function() {
        sandbox.resetHistory();
    })
    
    beforeEach(function() {})

    it(`should return a function`,
        function () {
            expect( uniqfilter() ).to.be.a('function');
        }
    )

    describe(`the function returned by uniqfilter()`, function() {

        afterEach(function() {
            sandbox.resetHistory();
        })
            
        beforeEach(function() {})

        it(`should return true if its argument does not strictly equal any argument passed before`,
            function () {
                const filter = uniqfilter();
                expect( filter(42) ).to.be.true;
                expect( filter(undefined) ).to.be.true;
                expect( filter(null) ).to.be.true;
                expect( filter('foobar') ).to.be.true;
                expect( filter(uniqfilter) ).to.be.true;
            }
        )

        it(`should return false if its argument strictly equals an argument passed before`,
            function () {
                const filter = uniqfilter();
                expect( filter(42) ).to.be.true;
                expect( filter(undefined) ).to.be.true;
                expect( filter(null) ).to.be.true;
                expect( filter('foobar') ).to.be.true;
                expect( filter(uniqfilter) ).to.be.true;

                expect( filter(42) ).to.be.false;
                expect( filter(undefined) ).to.be.false;
                expect( filter(null) ).to.be.false;
                expect( filter('foobar') ).to.be.false;
                expect( filter(uniqfilter) ).to.be.false;
            }
        )
    })
})