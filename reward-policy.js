(function(root){
const T=root.SubjectGameTokens||(typeof require==='function'?require('./game-tokens.js'):null);
const R=root.SharedRewards||(typeof require==='function'?require('./shared-rewards.js'):null);
function legacy(d){return Object.values(d.stats||{}).reduce((n,s)=>n+(s.c||0),0)*10+Object.keys(d.cleared||{}).length*20+(typeof DAYS==='undefined'?Object.values(d.done||{}).filter(Boolean).length:DAYS.filter(x=>d.done?.[x.n]).length)*50;}
function ensure(d){const seeds={},blocks=typeof DAYS==='undefined'?[]:DAYS.flatMap(d=>d.blocks);if(typeof MOCK_PAPER!=='undefined')blocks.push({...MOCK_PAPER,id:'mock-free'});for(const p of d.drills||[])if(p.n>0&&Number.isFinite(p.score)){const block=blocks.find(b=>b.id===p.id),n=p.rewardQuestions||(block?.sections?block.sections.reduce((n,s)=>n+s.items.length,0):p.n),correct=p.rewardCorrect??Math.floor(p.score/p.n*n),id='maths:'+p.id,amount=R.entitlement(Math.max(0,Math.min(n,correct)),n);seeds[id]=Math.max(seeds[id]||0,amount);}const total=R.init(d,'maths',legacy(d),seeds);T?.wallet(d,'maths');return total;}
function award(d,id,correct,n){ensure(d);const earned=R.award(d,'maths:'+id,correct,n);T?.wallet(d,'maths');return earned;}
function merge(a,b){ensure(a);ensure(b);const total=R.mergeInto(a,b);if(T)T.merge(a,b);return total;}
const api={ensure,award,merge,legacy,total:ensure};root.MathsRewards=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
