const binary = require('../src/binary');
const expect = require('chai').expect;
const sinon = require("sinon");

const ARG_A = {'label':'ARG_A'}
const ARG_B = {'label':'ARG_B'}

const collectargs = (...args) => args;

const countargs = (...args) => args.length;
const fakecountargs = sinon.fake(countargs);

describe( 'binary()', function() {

        beforeEach(function () {
            sinon.reset();
        })

        it(`should return a function`,

            function() {
                expect( binary(countargs) ).to.be.a('function');
            }
        )

        describe( 'The result function', function() {

            it(`should invoke the target function with exactly two arguments`,

                function() {
                    
                    const binarycountargs = binary(fakecountargs);
                    
                    expect(fakecountargs.callCount).to.be.equal(0);

                    expect( binarycountargs() ).to.be.equal(2);
                    expect(fakecountargs.callCount).to.be.equal(1);

                    expect( binarycountargs(1) ).to.be.equal(2);
                    expect(fakecountargs.callCount).to.be.equal(2);

                    expect( binarycountargs(1,2) ).to.be.equal(2);
                    expect(fakecountargs.callCount).to.be.equal(3);

                    expect( binarycountargs(1,2,3) ).to.be.equal(2);
                    expect(fakecountargs.callCount).to.be.equal(4);
                }
            )

            it(`should pass its own first two to arguments to the target function`,

                function() {
                    
                    const binarycollectargs = binary(collectargs);

                    let retval = binarycollectargs();
                    expect(retval).to.be.deep.equal([undefined, undefined]);

                    retval = binarycollectargs(ARG_A);
                    expect(retval).to.be.deep.equal([ARG_A, undefined]);

                    retval = binarycollectargs(ARG_A, ARG_B);
                    expect(retval).to.be.deep.equal([ARG_A, ARG_B]);

                    retval = binarycollectargs(ARG_A, ARG_B, ARG_A);
                    expect(retval).to.be.deep.equal([ARG_A, ARG_B]);
                }
            )
        })
    }
);
