const expect = require('chai').expect;
const groupby = require('../groupby');
const isdefined = require('../isdefined');
const isvoid = require('../isvoid');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const getgradefromscore = spy(
    function getgradefromscore(studentscore) {

        return studentscore?.score === undefined ? undefined
            : studentscore.score < 65 ? 'F'
            : studentscore.score < 70 ? 'D'
            : studentscore.score < 80 ? 'C'
            : studentscore.score < 90 ? 'B'
            : 'A';
    }
)

const studentscores = [];

function containsstudentscore(grades,studentscore) {

    for( grade in grades ) if( grades[grade].includes(studentscore) ) return true;

    return false;
}

describe(`groupby()`, function() {

    beforeEach(
        function() {

            sandbox.resetHistory();

            studentscores.length = 0;
            studentscores.push(
                [
                    { name:'Anne', score:55 },
                    { name:'Bruce', score:73 },
                    { name:'Christine', score:82 },
                    { name:'Donald', score:100 },
                    { name:'Edward', score:0 },
                    { name:'Francis' }
                ]
            )
        }
    )

    it(`should be curried`,
        function () {

            const curried = groupby(getgradefromscore);
            expect(curried).to.be.a('function');
            expect( curried(studentscores) ).to.be.an('object');
        }
    )

    it(`should throw if the key selector is not a function`,
        function () {
            expect( () => groupby(null, studentscores) ).to.throw();
            expect( () => groupby(undefined, studentscores) ).to.throw();
            expect( () => groupby({}, studentscores) ).to.throw();
        }
    )

    it(`should throw if the list is not iterable`,
        function () {
            expect( () => groupby(getgradefromscore, {}) ).to.throw();
        }
    )

    it(`should call the key selector once for each item in the list`,
        function () {
            groupby(getgradefromscore, studentscores);
            expect( getgradefromscore.callCount ).to.equal( studentscores.length );
        }
    )

    it(`should return an object that contains each item for which the keyselector returns a key`,
        function () {
            
            const result = groupby(getgradefromscore, studentscores);
            
            for( score of studentscores ) {
                if( isdefined( getgradefromscore(score) ) ) expect( containsstudentscore(result, score) ).to.be.true;
            }
        }
    )

    it(`should return an object that does not contain any item for which the keyselector returns an undefined key`,
        function () {

            const result = groupby(getgradefromscore, studentscores);
            
            for( score of studentscores ) {
                if( isvoid( getgradefromscore(score) ) ) expect( containsstudentscore(result, score) ).to.be.false;
            }
        }
    )
})