const compose = require('../src/compose');
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

describe( 'compose()', function() {

        it('should return a function', function() {
            expect( compose(double, id, double) ).to.be.a('function');
        })

        it('should throw if called without arguments', function() {
            expect( () => compose() ).to.throw;
        })

        describe( 'The result function', function() {

            beforeEach(function () {
                sinon.restore();
            })

            it('should call each target func once in reverse order', function() {
                
                const calllog = [];
                const log = initcalllog(calllog);

                const composition = compose( log(fakeid), log(fakedouble), log(fakeadd) );
                const retval = composition(42, 42);

                expect(retval).to.be.equal(168);
                expect(fakeadd.callCount).to.be.equal(1);
                expect(fakedouble.callCount).to.be.equal(1);
                expect(fakeid.callCount).to.be.equal(1);

                expect(calllog).to.be.deep.equal( [fakeadd, fakedouble, fakeid] );
            })

            it('should work with up to 10 target functions', function() {
                testcompositionrange(10);
            })

        })
    }
);

function testcompositionrange(count) {

    const targetfuncs = new Array(count).fill(fakeid);
    
    while(targetfuncs.length > 0) {
        
        fakeid.resetHistory();

        const composition = compose(...targetfuncs);
        const retval = composition(UNIQTHING);
        
        expect(retval).to.be.equal(UNIQTHING);
        expect(fakeid.callCount).to.be.equal(targetfuncs.length);

        targetfuncs.pop();
    }
}