const diff = require('../../src/lists/diff');
const list = require('../../src/lists/list');
const should = require('../../lib/test/should');
const fake = require('sinon').fake;

const idarray1 = [ { id:0 }, { id:1 }, { id:2 }, { id:3 }, { id:4 } ];
const idarray2 = [ { id:1 }, { id:3 }, { id:5 } ];
const idlist1 = list(idarray1);
const idlist2 = list(idarray2);
const diffarray = [ { id:0 }, { id:2 }, { id:4 } ];

const idlist1dups = list([...idarray1, { id:3 }, { id:4 } ]);
const idlist2dups = list([...idarray2, { id:3 }, { id:5 } ]);

// const getid = fake( obj=>(console.log('id:' + obj.id), obj.id) );
const getid = fake( obj=>obj.id );1

describe( 'lists/diff()', function() {

        beforeEach(function () {
            getid.resetHistory();
        })

        it('should be curried with binary arity',
            function() {
                should.return.a.function(diff, getid);
                should.return.a.function( diff(getid), idlist1 );
                should.return.an.iterable( diff(getid, idlist1), idlist2 );
            }
        )
        
        it('should throw if the hashing function is not a function nor null or undefined', function() {
            
            should.throw(diff, 0, idlist1, idlist2);
            should.throw(diff, {}, idlist1, idlist2);
            should.throw(diff, -1, idlist1, idlist2);
            should.throw(diff, 1.3, idlist1, idlist2);

            should.not.throw(diff, null, idlist1, idlist2);
            should.not.throw(diff, undefined, idlist1, idlist2);
            should.not.throw(diff, getid, idlist1, idlist2);
        })

        it(`should throw if the first list is not iterable`, function() {
            
            should.throw(diff, getid, {}, idlist2);
            should.throw(diff, getid, null, idlist2);
            should.throw(diff, getid, diff, idlist2);
        })

        it(`should throw if the second list is not iterable`, function() {
            
            should.throw(diff, getid, idlist1, {});
            should.throw(diff, getid, idlist1, null);
            should.throw(diff, getid, idlist1, diff);
        })

        it('should return an iterable object', function() {
            should.return.an.iterable(diff, getid, idlist1, idlist2);
        })

        describe( 'The iterable returned by diff()', function() {

            it('should call the hashing function at least once for each item in both lists', function() {

                const list1 = [...idlist1];
                const list2 = [...idlist2];
                
                should.not.be.called(getid);

                [...diff(getid, list1, list2)];

                should.be.less.than.or.equal.to(list1.length + list2.length <= getid.callCount);
            })

            it('should produce the items from the first list that are not present in the second list', function() {
                
                const difference = [...diff(getid, idlist1, idlist2)];

                should.be.like(diffarray, difference);
            })

            it('should contain only uniq items', function() {
                
                const difference = [...diff(getid, idlist1dups, idlist2dups)];

                should.be.like(diffarray, difference);
            })

            it('should be empty if the first list is empty', function() {
                should.be.empty( diff(getid, [], idlist2) );
            })

            it('should be lazy', function() {

                const idarray1copy = idarray1.slice();
                const idlist1copy = list(idarray1copy);

                const difference = diff(getid, idlist1copy, idlist2);
                
                should.be.like([...difference], diffarray);
                
                idarray1copy.push( {id:42} );
                
                should.be.like([...difference], [...diffarray, {id:42}]);
                
                idarray1copy.length = 0;

                should.be.zero( [...difference].length );
            })
        });

    }
);