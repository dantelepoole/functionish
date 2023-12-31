const iterate = require('../../src/lists/iterate');
const should = require('../../lib/test/should');
const fake = require('sinon').fake;

const numbers1to5 = [1,2,3,4,5];
const bogusfunc = fake( ()=>{} );

const abortfubar = count => fake( (x, abort) => (--count === 0 ? abort(x) : 'fubar') );

describe( 'lists/iterate()', function() {

        beforeEach(function () {
            bogusfunc.resetHistory();
        })

        it('should be curried with unary arity',
            function() {
                should.return.a.function(iterate, bogusfunc)
                should.return( numbers1to5, iterate(bogusfunc), numbers1to5 );
            }
        )
        
        it('should throw if the target function is not a function nor a string', function() {
            
            should.throw(iterate, 0, numbers1to5);
            should.throw(iterate, {}, numbers1to5);
            should.throw(iterate, -1, numbers1to5);
            should.throw(iterate, 1.3, numbers1to5);
            should.throw(iterate, null, numbers1to5);
            should.throw(iterate, undefined, numbers1to5);
            should.throw(iterate, 1n, numbers1to5);
        })

        it('should throw if the target function is a string that does not resolve to a function in a package or file module', function() {
            
            should.throw(iterate, 'path#FuBar', numbers1to5);
            should.throw(iterate, 'path#delimiter', numbers1to5);
        })
        it(`should throw if the source list is not iterable`, function() {
            
            should.throw(iterate, bogusfunc, {});
            should.throw(iterate, bogusfunc, null);
            should.throw(iterate, bogusfunc, iterate);
            should.throw(iterate, bogusfunc, { forEach:'notamethod' });
        })

        it('should return the source list if the target function does not call the abort() function', function() {

            const numbers1to5list = { [Symbol.iterator]:Array.prototype.values.bind(numbers1to5) };

            should.return(numbers1to5list, iterate, bogusfunc, numbers1to5list);

        })

        it('should call the target function once for each item in the source list', function() {

            should.not.be.called(bogusfunc);
            
            iterate(bogusfunc, numbers1to5);

            should.be(numbers1to5.length, bogusfunc.callCount);

            for(let i=0; i < numbers1to5.length; i += 1) {
                should.be(numbers1to5[i], bogusfunc.args[i][0]);
            }
        })

        it('should return the argument passed by the target function to the abort() function', function() {

            const targetfunc = abortfubar(3);

            should.not.be.called(targetfunc);
            
            const result = iterate(targetfunc, numbers1to5);

            should.be(3, targetfunc.callCount);
            should.be(result, numbers1to5[2]);
        })
    }
);