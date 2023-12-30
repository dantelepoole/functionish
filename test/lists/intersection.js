const intersection = require('../../src/lists/intersection');
const list = require('../../src/lists/list');
const should = require('../../lib/test/should');
const fake = require('sinon').fake;

const paths = ['/', '/home', '../'];

const idarray1 = [ { id:0 }, { id:1 }, { id:2 }, { id:3 }, { id:4 } ];
const idarray2 = [ { id:1 }, { id:3 }, { id:5 } ];
const idlist1 = list(idarray1);
const idlist2 = list(idarray2);
const intersectionarray = [ { id:1 }, { id:3 } ];

const idlist1dups = list([...idarray1, { id:3 }, { id:4 } ]);
const idlist2dups = list([...idarray2, { id:3 }, { id:5 } ]);

const getid = fake( obj=>obj.id );

describe( 'lists/intersection()', function() {

        beforeEach(function () {
            getid.resetHistory();
        })

        it('should be curried with binary arity',
            function() {
                should.return.a.function(intersection, getid);
                should.return.a.function( intersection(getid), idlist1 );
                should.return.an.iterable( intersection(getid, idlist1), idlist2 );
            }
        )
        
        it('should throw if the hash function is not a function, a string or null/undefined', function() {
            should.throw(intersection, 42, paths, paths);
            should.throw(intersection, {}, paths, paths);
            should.throw(intersection, paths, paths, paths);
        })
        
        it('should throw if the hash function is a string that does not resolve to a function in a package or file module', function() {
            
            should.throw(intersection, 'path#FuBar', paths, paths);
            should.throw(intersection, 'path#delimiter', paths, paths);
        })

        it(`should throw if the first list is not iterable`, function() {
            
            should.throw(intersection, getid, {}, idlist2);
            should.throw(intersection, getid, null, idlist2);
            should.throw(intersection, getid, intersection, idlist2);
        })

        it(`should throw if the second list is not iterable`, function() {
            
            should.throw(intersection, getid, idlist1, {});
            should.throw(intersection, getid, idlist1, null);
            should.throw(intersection, getid, idlist1, intersection);
        })

        it('should return an iterable object', function() {
            should.return.an.iterable(intersection, getid, idlist1, idlist2);
        })

        describe( 'The iterable returned by intersection()', function() {

            it('should call the hashing function at least once for each item in both lists', function() {

                const array1 = [...idlist1];
                const array2 = [...idlist2];
                
                should.not.be.called(getid);

                [...intersection(getid, array1, array2)];

                should.be.greater.than.or.equal.to(array1.length + array2.length, getid.callCount);
            })

            it('should produce the items from the first list that are also present in the second list', function() {
                should.be.like(intersectionarray, [...intersection(getid, idlist1, idlist2)]);
            })

            it('should contain only uniq items', function() {
                
                const intersect = [...intersection(getid, idlist1dups, idlist2dups)];

                should.be.like(intersectionarray, intersect);
            })

            it('should be empty if the first list is empty', function() {
                should.be.empty( intersection(getid, [], idlist2) );
            })

            it('should be empty if the second list is empty', function() {
                should.be.empty( intersection(getid, idlist1, []) );
            })

            it('should be lazy', function() {

                const idarray1copy = idarray1.slice();
                const idlist1copy = list(idarray1copy);

                const idarray2copy = idarray2.slice();
                const idlist2copy = list(idarray2copy);

                const intersect = intersection(getid, idlist1copy, idlist2copy);
                
                should.be.like([...intersect], intersectionarray);
                
                idarray1copy.push( {id:42} );
                idarray2copy.push( {id:42} );
                
                should.be.like([...intersect], [...intersectionarray, {id:42}]);
                
                idarray1copy.length = 0;

                should.be.zero( [...intersect].length );
            })
        });

    }
);