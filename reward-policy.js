(function(root){
const R=root.SharedRewards||(typeof require==='function'?require('./shared-rewards.js'):null);
function legacy(d){return Object.values(d.stats||{}).reduce((n,s)=>n+(s.c||0),0)*10+Object.keys(d.cleared||{}).length*20+(typeof DAYS==='undefined'?Object.values(d.done||{}).filter(Boolean).length:DAYS.filter(x=>d.done?.[x.n]).length)*50;}
function ensure(d){const seeds={},blocks=typeof DAYS==='undefined'?[]:DAYS.flatMap(d=>d.blocks);if(typeof MOCK_PAPER!=='undefined')blocks.push({...MOCK_PAPER,id:'mock-free'});for(const p of d.drills||[])if(p.n>0&&Number.isFinite(p.score)){const block=blocks.find(b=>b.id===p.id),n=p.rewardQuestions||(block?.sections?block.sections.reduce((n,s)=>n+s.items.length,0):p.n),correct=p.rewardCorrect??Math.floor(p.score/p.n*n),id='maths:'+p.id,amount=R.entitlement(Math.max(0,Math.min(n,correct)),n);seeds[id]=Math.max(seeds[id]||0,amount);}return R.init(d,'maths',legacy(d),seeds);}
function award(d,id,correct,n){ensure(d);return R.award(d,'maths:'+id,correct,n);}
function merge(a,b){ensure(a);ensure(b);return R.mergeInto(a,b);}
const api={ensure,award,merge,legacy,total:ensure};root.MathsRewards=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
