const list = require('../../src/lists/list');
const should = require('../../lib/test/should');
const fake = require('sinon').fake;

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8.9,10]);

describe( 'lists/list()', function() {

        beforeEach(function () {})
        
        it('should throw if the source is not a function or an iterable object',
            function() {

                should.throw(list, {});
                should.throw(list, null);
                should.throw(list);
                should.throw(list, 42);

                should.not.throw(list, numbers1to10);
                should.not.throw(list, function() {});
            }
        )
        
        it('should return the source if the source is already a List-instance', function() {
            
            const sourcelist = list(numbers1to10);

            should.return(sourcelist, list, sourcelist);
        })

        it('should return an iterable object', function() {
          
            should.return.an.iterable(list, numbers1to10);
            should.return.an.iterable(list, function() {});
        })

        describe( 'The iterable returned by list()', function() {

            it(`should, upon iteration, call source's @@iterator method if source is iterable`, function() {

                const fakevalues = fake( ()=>numbers1to10.values() );
                const source = { [Symbol.iterator]:fakevalues };

                [...list(source)];

                should.be.called(fakevalues);
            })

            it(`should produce source's items if source is iterable`, function() {

                const numbers1to10list = list(numbers1to10);
                should.be.like(numbers1to10, [...numbers1to10list]);
            })

            it(`should, upon iteration, call source without arguments if source is a function`, function() {

                const fakesource = fake( ()=>numbers1to10.values() );

                [...list(fakesource)];

                should.be.called(fakesource);
                should.be.empty(fakesource.args[0]);
            })

            it('should be lazy', function() {

                const numbers1to10copy = numbers1to10.slice();
                const numbers1to10list = list(numbers1to10copy);
                
                should.be.like(numbers1to10copy, [...numbers1to10list]);
                
                numbers1to10copy.push(12, 12, 13);

                should.be.like([...numbers1to10copy], [...numbers1to10list]);
            })
        });

    }
);