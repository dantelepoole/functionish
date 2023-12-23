const wrap = require('../src/wrap');
const expect = require('chai').expect;
const sinon = require('sinon');

const testnumbers = [1,2,3,4,5]; // sum = 15

const sum = sinon.fake( (...numbers) => numbers.reduce( (a,b)=>(a+b), 0 ) );
const wrapdouble = sinon.fake( (func, ...numbers) => 2 * func(...numbers) );
const wraponlyodd = sinon.fake( (func, ...numbers) => func(...numbers.filter(x=>x%2===1)) );
const wrapskip = sinon.fake( () => undefined );
const wrappass = sinon.fake( (func, ...args) => func(...args) );
const raise = sinon.fake( () => { throw new Error() } );
const noop = () => {}
const initcalllog = array => func => (...args) => (array.push(func), func(...args));

describe( 'wrap()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            sum.resetHistory();
            wrapdouble.resetHistory();
            wraponlyodd.resetHistory();
            wrapskip.resetHistory();
            raise.resetHistory();
            wrappass.resetHistory();
        })
        
        it('should return a function', function() {
            expect( wrap(wrapdouble, sum) ).to.be.a('function');
        })

        it('should throw if the target function is not a function', function() {
            
            expect( () => wrap(wrapdouble, {}) ).to.throw();
            expect( () => wrap(wrapdouble, null) ).to.throw();
            expect( () => wrap(wrapdouble, 'fubar') ).to.throw();
            expect( () => wrap(wrapdouble, 42) ).to.throw();
        })

        it('should throw if the wrapper argument is neither a function nor a function-array', function() {
            
            expect( () => wrap(42, sum) ).to.throw();
            expect( () => wrap(undefined, 42) ).to.throw();
        })

        it('should throw if the wrapper argument is an empty array', function() {
            expect( () => wrap([], 42) ).to.throw();
        })

        describe( 'If the wrapper is a function, the result function', function() {

            it('should pass the target function and its own arguments to the wrapper function', function() {

                expect(wrapdouble.callCount).to.equal(0);

                const doublesum = wrap(wrapdouble, sum);
                doublesum(...testnumbers);

                expect(wrapdouble.callCount).to.equal(1);
                expect(wrapdouble.args[0]).to.deep.equal( [sum, ...testnumbers] );
            })

            it(`should return the wrapper function's return value`, function() {

                const doublesum = wrap(wrapdouble, sum);
                const retval = doublesum(...testnumbers);

                expect(retval).to.equal(30);
                expect(wrapdouble.returnValues[0]).to.equal(30);
            })

            it(`should throw if the wrapper function throws`, function() {

                const raisesum = wrap(raise, sum);
                expect( () => raisesum(...testnumbers) ).to.throw();
            })

            it(`should throw if the target function throws`, function() {

                const doubleraise = wrap(wrapdouble, raise);
                expect( () => doubleraise(...testnumbers) ).to.throw();
            })
        })

        it(`should be curried`, function() {
            
            const double = wrap(wrapdouble);
            expect(double).to.be.a('function');

            const doublesum = double(sum);
            expect(doublesum).to.be.a('function');

            const retval = doublesum(...testnumbers);
            expect(retval).to.equal(30);
        })

        describe( 'If the wrapper is a function-array, the result function', function() {

            it('should invoke the first wrapper function and pass the second wrapper function followed by its own arguments', function() {

                expect(wrapskip.callCount).to.equal(0);
                expect(wrapdouble.callCount).to.equal(0);
                expect(wraponlyodd.callCount).to.equal(0);

                const skipdoublesumonlyodd = wrap( [wrapskip, wrapdouble, wraponlyodd], sum );
                skipdoublesumonlyodd(...testnumbers);

                expect(wrapskip.callCount).to.equal(1);
                expect(wrapdouble.callCount).to.equal(0);
                expect(wraponlyodd.callCount).to.equal(0);

                expect(wrapskip.args[0].slice(1)).to.deep.equal(testnumbers);

                const secondwrapper = wrapskip.args[0][0];
                secondwrapper(...testnumbers);
                expect(wrapdouble.callCount).to.equal(1);
                expect(wrapdouble.args[0].slice(1)).to.deep.equal(testnumbers);
            })

            it(`should follow the first argument to the first wrapper function with its own arguments`, function() {

                const doublesumonlyodd = wrap( [wrapdouble, wraponlyodd], sum );
                doublesumonlyodd(...testnumbers);

                expect(wrapdouble.args[0].slice(1)).to.deep.equal(testnumbers);
            })

            it(`should invoke the last wrapper function in the array with the target function as the first argument`, function() {

                const doublesumonlyodd = wrap( [wrapdouble, wraponlyodd, wrapskip], sum );
                doublesumonlyodd(...testnumbers);

                expect(wrapskip.args[0][0]).to.equal(sum);
            })

            it(`should see the wrapper function called in order, ending with the target function`, function() {

                const calllog = [];
                const log = initcalllog(calllog);

                const doublesumonlyoddpass = wrap( [log(wrapdouble), log(wraponlyodd), log(wrappass)], log(sum) );

                doublesumonlyoddpass(...testnumbers);

                expect(calllog).to.deep.equal( [wrapdouble, wraponlyodd, wrappass, sum] );
            })

            it(`should return the first wrapper function's return value`, function() {

                const doublesumonlyoddpass = wrap( [wrapdouble, wraponlyodd, wrappass], sum );

                const retval = doublesumonlyoddpass(...testnumbers);

                expect(retval).to.equal(wrapdouble.returnValues[0]);
            })

            it(`should throw if any wrapper function throws`, function() {

                let raisesum = wrap( [wrapdouble, raise, wraponlyodd], sum);
                expect( () => raisesum(...testnumbers) ).to.throw();

                raisesum = wrap( [raise, wrapdouble, wraponlyodd], sum);
                expect( () => raisesum(...testnumbers) ).to.throw();

                raisesum = wrap( [wrapdouble, wraponlyodd, raise], sum);
                expect( () => raisesum(...testnumbers) ).to.throw();
            })

            it(`should throw if the target function throws`, function() {

                const doubleraise = wrap([wrapdouble, wraponlyodd], raise);
                expect( () => doubleraise(...testnumbers) ).to.throw();
            })
        })
    }
);