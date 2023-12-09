const runningaverage = require('../../src/math/runningaverage');
const expect = require('chai').expect;
const sinon = require("sinon");

describe( 'runningaverage()', function() {

    beforeEach(function () {
        sinon.resetHistory();
    })

    it(`should return a function`, function() {
        runningaverage();
    })

    describe( 'The returned function()', function() {

        it(`should return the average value of all numbers passed on all calls thus far`, function() {
            
            const trackaverage = runningaverage();

            expect( trackaverage() ).to.equal(0);
            expect( trackaverage(1) ).to.equal(1);
            expect( trackaverage(2,3) ).to.equal(2);
            expect( trackaverage(4,5,6,7,8,9) ).to.equal(5);

        })

        it(`should have a reset() method`, function() {
            
            const trackaverage = runningaverage();

            expect( trackaverage.reset ).to.be.a('function');

        })

        describe( 'The returned function()', function() {

            it(`should return 0`, function() {
                
                const trackaverage = runningaverage();
    
                expect( trackaverage.reset() ).to.equal(0);
            })
    
            it(`should have a reset() method`, function() {
                
                const trackaverage = runningaverage();
    
                expect( trackaverage.reset ).to.be.a('function');
    
            })

            it(`should reset the running average to 0`, function() {
            
                const trackaverage = runningaverage();
    
                expect( trackaverage() ).to.equal(0);
                expect( trackaverage(1) ).to.equal(1);
                expect( trackaverage(2,3) ).to.equal(2);
                expect( trackaverage(4,5,6,7,8,9) ).to.equal(5);
    
                trackaverage.reset();

                expect( trackaverage() ).to.equal(0);
                expect( trackaverage(1) ).to.equal(1);
                expect( trackaverage(2,3) ).to.equal(2);
                expect( trackaverage(4,5,6,7,8,9) ).to.equal(5);
            })
    
        });

    });

});
