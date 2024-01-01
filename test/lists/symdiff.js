const symdiff = require('../../src/lists/symdiff');
const list = require('../../src/lists/list');
const should = require('../../lib/test/should');
const fake = require('sinon').fake;

const paths = ['/', '/home', '../'];

const idarray1 = [ { id:0 }, { id:1 }, { id:2 }, { id:3 }, { id:4 } ];
const idarray2 = [ { id:1 }, { id:3 }, { id:5 } ];
const idlist1 = list(idarray1);
const idlist2 = list(idarray2);
const symdiffarray = [ { id:0 }, { id:2 }, { id:4 }, { id:5 } ];

const idlist1dups = list([...idarray1, { id:3 }, { id:4 } ]);
const idlist2dups = list([...idarray2, { id:3 }, { id:5 } ]);

const getid = fake( obj=>obj.id );1

describe( 'lists/symdiff()', function() {

        beforeEach(function () {
            getid.resetHistory();
        })

        it('should be curried with binary arity',
            function() {
                should.return.a.function(symdiff, getid);
                should.return.a.function( symdiff(getid), idlist1 );
                should.return.an.iterable( symdiff(getid, idlist1), idlist2 );
            }
        )
        
        it('should throw if the hash function is not a function, a string or null/undefined', function() {
            should.throw(symdiff, 42, paths, paths);
            should.throw(symdiff, {}, paths, paths);
            should.throw(symdiff, paths, paths, paths);
        })
        
        it('should throw if the hash function is a string that does not resolve to a function in a package or file module', function() {
            
            should.throw(symdiff, 'path#FuBar', paths, paths);
            should.throw(symdiff, 'path#delimiter', paths, paths);
        })

        it(`should throw if the first list is not iterable`, function() {
            
            should.throw(symdiff, getid, {}, idlist2);
            should.throw(symdiff, getid, null, idlist2);
            should.throw(symdiff, getid, symdiff, idlist2);
        })

        it(`should throw if the second list is not iterable`, function() {
            
            should.throw(symdiff, getid, idlist1, {});
            should.throw(symdiff, getid, idlist1, null);
            should.throw(symdiff, getid, idlist1, symdiff);
        })

        it('should return an iterable object', function() {
            should.return.an.iterable(symdiff, getid, idlist1, idlist2);
        })

        describe( 'The iterable returned by symdiff()', function() {

            it('should call the hashing function at least once for each item in both lists', function() {

                const list1 = [...idlist1];
                const list2 = [...idlist2];
                
                should.not.be.called(getid);

                [...symdiff(getid, list1, list2)];

                should.be.greater.than.or.equal.to(list1.length + list2.length, getid.callCount);
            })

            it('should produce the items that are not present in boths lists', function() {
                
                const difference = [...symdiff(getid, idlist1, idlist2)];

                should.be.like(symdiffarray, difference);
            })

            it('should contain only uniq items', function() {
                
                const difference = [...symdiff(getid, idlist1dups, idlist2dups)];

                should.be.like(symdiffarray, difference);
            })

            it('should be lazy', function() {

                const idarray1copy = idarray1.slice();
                const idlist1copy = list(idarray1copy);

                const difference = symdiff(getid, idlist1copy, idlist2);
                
                should.be.like([...difference], symdiffarray);
                
                idarray1copy.push( {id:42} );

                const symdiffarraycopy = symdiffarray.slice();
                const lastsymdiffitem = symdiffarraycopy.pop();
                symdiffarraycopy.push( {id:42}, lastsymdiffitem );

                should.be.like([...difference], [...symdiffarraycopy]);
                
                idarray1copy.length = 0;
                should.be(idarray2.length, [...difference].length);
            })
        });

    }
);