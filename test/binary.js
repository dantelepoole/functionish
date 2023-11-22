const binary = require('../src/binary');
const expect = require('chai').expect;
const sinon = require("sinon");

const ARG_A = {'label':'ARG_A'}
const ARG_B = {'label':'ARG_B'}

const collectargs = (...args) => args;
const fakecollectargs = sinon.fake(collectargs);

const countargs = (...args) => args.length;

describe( 'binary()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            fakecollectargs.resetHistory();
        })

        it(`should return a function`, function() {
            expect( binary(countargs) ).to.be.a('function');
        })

        describe( 'The result function', function() {

            it(`should throw if the target function is not a function`, function() {

                const badbinary = binary();
                expect( () => badbinary() ).to.throw();
            })

            it(`should invoke the target function with exactly two arguments`, function() {
                
                const binarycollectargs = binary(fakecollectargs);
                
                binarycollectargs();
                expect(fakecollectargs.args[0]).to.be.deep.equal([undefined, undefined]);

                binarycollectargs(ARG_A);
                expect(fakecollectargs.args[1]).to.be.deep.equal([ARG_A, undefined]);

                binarycollectargs(ARG_A, ARG_B);
                expect(fakecollectargs.args[2]).to.be.deep.equal([ARG_A, ARG_B]);

                binarycollectargs(ARG_A, ARG_B, ARG_A);
                expect(fakecollectargs.args[3]).to.be.deep.equal([ARG_A, ARG_B]);
            })

            it(`should pass its own first two to arguments to the target function`, function() {
                
                const binarycollectargs = binary(collectargs);

                let retval = binarycollectargs();
                expect(retval).to.be.deep.equal([undefined, undefined]);

                retval = binarycollectargs(ARG_A);
                expect(retval).to.be.deep.equal([ARG_A, undefined]);

                retval = binarycollectargs(ARG_A, ARG_B);
                expect(retval).to.be.deep.equal([ARG_A, ARG_B]);

                retval = binarycollectargs(ARG_A, ARG_B, ARG_A);
                expect(retval).to.be.deep.equal([ARG_A, ARG_B]);
            })

            it(`should return the target function's return value`, function() {
                
                const binarycollectargs = binary(collectargs);

                let retval = binarycollectargs();
                expect(retval).to.be.deep.equal([undefined, undefined]);

                retval = binarycollectargs(ARG_A);
                expect(retval).to.be.deep.equal([ARG_A, undefined]);

                retval = binarycollectargs(ARG_A, ARG_B);
                expect(retval).to.be.deep.equal([ARG_A, ARG_B]);

                retval = binarycollectargs(ARG_A, ARG_B, ARG_A);
                expect(retval).to.be.deep.equal([ARG_A, ARG_B]);
            })
        })
    }
);
