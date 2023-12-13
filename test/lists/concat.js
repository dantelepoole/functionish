const concat = require('../../src/lists/concat');
const should = require('../../lib/test/should');

const UNIQTHING = { Label:'UNIQTHING' }

const array1to5 = [1,2,3,4,5];
const array6to10 = [6,7,8,9,10];
const array11to15 = [11,12,13,14,15];
const list1to5 = { [Symbol.iterator]:Array.prototype.values.bind(array1to5), [Symbol.isConcatSpreadable]:true  }
const list6to10 = { [Symbol.iterator]:Array.prototype.values.bind(array6to10), [Symbol.isConcatSpreadable]:true  }
const list11to15nospread = { [Symbol.iterator]:Array.prototype.values.bind(array11to15), [Symbol.isConcatSpreadable]:false }

describe( 'concat()', function() {

        describe( 'If the first argument is a string, concat()', function() {

            it('should return the arguments concatenated to a single string', function() {
                
                should.return(
                    'tobeornottobe',
                    concat,
                    'to', 'be', 'or', 'not','to','be'
                );
            })

            it('should flatten its arguments by one level', function() {
                
                should.return(
                    'tobeornottobe',
                    concat,
                    'to', 'be', ['or', 'not','to','be']
                );

                should.return(
                    'tobeornotto,be',
                    concat,
                    'to', 'be', ['or', 'not',['to','be']]
                );
            })

        });

        describe( 'If the first argument is not a string, concat()', function() {

            it('should return an iterable object', function() {
                
                should.return.an.iterable(
                    concat,
                    array1to5, array6to10
                );

                should.return.an.iterable(
                    concat,
                    list1to5, list6to10, array11to15
                );

                should.return.an.iterable(
                    concat,
                    {}, true, 42
                );
            })

            it('should flatten its concat-spreadable arguments by one level', function() {
                
                should.be.like(
                    [...array1to5, ...list6to10, array11to15, 31, 32, 33, UNIQTHING],
                    [...concat(array1to5, list6to10, [array11to15], 31, 32, 33, UNIQTHING)]
                );

                should.be.like(
                    [...array1to5, ...list6to10, array11to15, 31, 32, 33, UNIQTHING],
                    [...concat(array1to5, list6to10, [array11to15], 31, 32, 33, UNIQTHING)]
                );

                const concatenated = concat(array1to5, list6to10, list11to15nospread);
                should.be(list11to15nospread, [...concatenated].pop());
            })

            it('should be lazy but only reflect changes to the items of iterable objects more than one level deep', function() {
                
                const array1to5copy = array1to5.slice();
                const lazylist = concat(list1to5, [array1to5copy]);

                should.be.like( [...list1to5, array1to5copy], [...lazylist]);

                array1to5copy[0] = 42;

                should.be.like( [...list1to5, array1to5copy], [...lazylist]);
            })

        });
    }
);