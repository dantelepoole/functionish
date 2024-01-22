const RUN_COUNT = 10_000_000;

let renameflag = false;

function rename(func, name) {

    if( !renameflag ) return func;
    
    return {
        [name]: (...args) => func(...args)
    }[name];
}

function initnewfunc(fubar) {
    const newfunc = (x) => (x+fubar);
    return rename(newfunc, 'renamedfunc');
}

let result = undefined;

console.time('NO RENAME');
for(let i=0; i < RUN_COUNT; i += 1) result = initnewfunc(42);
console.timeEnd('NO RENAME');

renameflag = true;

result = undefined;

console.time('RENAME');
for(let i=0; i < RUN_COUNT; i += 1) result = initnewfunc(42);
console.timeEnd('RENAME');
