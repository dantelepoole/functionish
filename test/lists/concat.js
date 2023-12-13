const concat = require('../../src/lists/concat');
const should = require('../../lib/test/should');

const UNIQTHING = { Label:'UNIQTHING' }

const array1to10 = [1,2,3,4,5,6,7,8,9,10];
const array11to20 = [11,12,13,14,15,16,17,18,19,20];
const array21to30 = [21,22,23,24,25,26,27,28,29,30];
const list1to10 = { [Symbol.iterator]:Array.prototype.values.bind(array1to10), [Symbol.isConcatSpreadable]:true  }
const list11to20 = { [Symbol.iterator]:Array.prototype.values.bind(array11to20), [Symbol.isConcatSpreadable]:true  }
const list21to30nospread = { [Symbol.iterator]:Array.prototype.values.bind(array21to30), [Symbol.isConcatSpreadable]:false }

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
                    array1to10, array11to20
                );

                should.return.an.iterable(
                    concat,
                    list1to10, list11to20, array21to30
                );

                should.return.an.iterable(
                    concat,
                    {}, true, 42
                );
            })

            it('should flatten its concat-spreadable arguments by one level', function() {
                
                should.be.like(
                    [...array1to10, ...list11to20, array21to30, 31, 32, 33, UNIQTHING],
                    [...concat(array1to10, list11to20, [array21to30], 31, 32, 33, UNIQTHING)]
                );

                should.be.like(
                    [...array1to10, ...list11to20, array21to30, 31, 32, 33, UNIQTHING],
                    [...concat(array1to10, list11to20, [array21to30], 31, 32, 33, UNIQTHING)]
                );

                const concatenated = concat(array1to10, list11to20, list21to30nospread);
                should.be(list21to30nospread, [...concatenated].pop());
            })

        });
    }
);