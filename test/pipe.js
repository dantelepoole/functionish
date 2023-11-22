const pipe = require('../src/pipe');
const expect = require('chai').expect;
const sinon = require("sinon");

const UNIQTHING = { label:'UNIQTHIS' }

const add = (a,b) => (a+b);
const fakeadd = sinon.fake(add);

const double = x => (2 * x);
const fakedouble = sinon.fake(double);

const id = x => x;
const fakeid = sinon.fake(id);

const initcalllog = array => func => (...args) => (array.push(func), func(...args));

describe( 'pipe()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            fakeadd.resetHistory();
            fakedouble.resetHistory();
            fakeid.resetHistory();
        })

        it('should return a function', function() {
            expect( pipe(double, id, double) ).to.be.a('function');
        })

        it('should throw if called without arguments', function() {
            expect( () => pipe() ).to.throw;
        })

        describe( 'The result function', function() {

            it('should call each target func once in order', function() {
                
                const calllog = [];
                const log = initcalllog(calllog);

                const functionpipe = pipe( log(fakeadd), log(fakedouble), log(fakeid) );
                const retval = functionpipe(42, 42);

                expect(retval).to.be.equal(168);
                expect(fakeadd.callCount).to.be.equal(1);
                expect(fakedouble.callCount).to.be.equal(1);
                expect(fakeid.callCount).to.be.equal(1);

                expect(calllog).to.be.deep.equal( [fakeadd, fakedouble, fakeid] );
            })

            it('should work with any number of target functions', function() {
                testpiperange(20);
            })

        })
    }
);

function testpiperange(count) {

    const targetfuncs = new Array(count).fill(fakeid);
    
    while(targetfuncs.length > 0) {
        
        fakeid.resetHistory();

        const functionpipe = pipe(...targetfuncs);
        const retval = functionpipe(UNIQTHING);
        
        expect(retval).to.be.equal(UNIQTHING);
        expect(fakeid.callCount).to.be.equal(targetfuncs.length);

        targetfuncs.pop();
    }
}