const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(__dirname+'/app.js','utf8');
const code=source.slice(source.indexOf('  const levelOpen ='),source.indexOf('  function updateLessonNav'))+'\nthis.open=levelOpen;';
const c={DAYS:Array.from({length:10},(_,i)=>({n:i+1})),Store:{d:{done:{},xp:{total:1070}}},teacher:false};c.isTeacher=()=>c.teacher;vm.createContext(c);vm.runInContext(code,c);
assert.equal(c.open(1),true);for(let i=2;i<=10;i++)assert.equal(c.open(i),false);
c.Store.d.done[1]=true;assert.equal(c.open(1),true);assert.equal(c.open(2),true);assert.equal(c.open(3),false);
c.Store.d.done[3]=true;assert.equal(c.open(4),false,'An out-of-order completion cannot skip unfinished Level 2');
for(let i=1;i<=10;i++){c.Store.d.done[i]=true;assert.equal(c.open(i),true);if(i<10)assert.equal(c.open(i+1),true);}
c.Store.d.done={};assert.match(source,/const isTeacher = \(\) => false;/);c.teacher=false;assert.equal(c.open(2),false);
for(const n of [0,11,NaN,1.5])assert.equal(c.open(n),false);
assert.equal(c.Store.d.xp.total,1070);assert.deepEqual(c.Store.d.done,{});
assert.match(source,/if \(!levelOpen\(n\)\)/);assert.match(source,/n < DAYS.length && levelOpen\(n\+1\)/);
assert.match(source,/!levelOpen\(i\+1\) \? 'lock'/);
console.log('PASS: sequential completion gates, no skipping gaps, shared parent/student gates, route/map/next guards, unchanged XP and completion flags.');
